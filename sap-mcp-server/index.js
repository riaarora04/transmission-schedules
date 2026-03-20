#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  ListResourcesRequestSchema,
  ReadResourceRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import axios from 'axios';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const MOCK_MODE = process.env.MOCK_MODE === 'true';
const MOCK_DELAY = parseInt(process.env.MOCK_DELAY_MS || '500');
const SAP_BTP_HOST = process.env.SAP_BTP_HOST;
const SAP_CLIENT_ID = process.env.SAP_CLIENT_ID;
const SAP_CLIENT_SECRET = process.env.SAP_CLIENT_SECRET;
const SAP_TOKEN_URL = process.env.SAP_TOKEN_URL;

// Mock data for development
const MOCK_DATA = {
  businessPartners: [
    { BusinessPartner: '1000000', BusinessPartnerName: 'SAP SE', Country: 'DE' },
    { BusinessPartner: '1000001', BusinessPartnerName: 'Acme Corp', Country: 'US' },
    { BusinessPartner: '1000002', BusinessPartnerName: 'Global Industries', Country: 'UK' },
  ],
  salesOrders: [
    { SalesOrder: '100001', SoldToParty: '1000000', NetAmount: '50000.00', Currency: 'EUR', Status: 'Approved' },
    { SalesOrder: '100002', SoldToParty: '1000001', NetAmount: '75000.00', Currency: 'USD', Status: 'Requested' },
    { SalesOrder: '100003', SoldToParty: '1000002', NetAmount: '32000.00', Currency: 'GBP', Status: 'Error' },
  ],
  materials: [
    { Material: 'MAT001', MaterialDescription: 'Finished Product A', StockQuantity: 500, Unit: 'EA' },
    { Material: 'MAT002', MaterialDescription: 'Raw Material B', StockQuantity: 1200, Unit: 'KG' },
    { Material: 'MAT003', MaterialDescription: 'Component C', StockQuantity: 750, Unit: 'PC' },
  ],
  packagingOrders: [
    {
      OrderID: 'PKG001',
      Material: 'MAT001',
      Quantity: 100,
      Status: 'Approved',
      RequestedDate: '2026-03-10',
      CompletionDate: '2026-03-15',
      Customer: 'SAP SE',
    },
    {
      OrderID: 'PKG002',
      Material: 'MAT002',
      Quantity: 250,
      Status: 'Requested',
      RequestedDate: '2026-03-12',
      CompletionDate: null,
      Customer: 'Acme Corp',
    },
  ],
};

// OAuth token cache
let accessToken = null;
let tokenExpiry = null;

// Simulate API delay in mock mode
const mockDelay = () => new Promise(resolve => setTimeout(resolve, MOCK_DELAY));

// Get OAuth token
async function getAccessToken() {
  if (MOCK_MODE) {
    return 'mock-access-token';
  }

  // Check if token is still valid
  if (accessToken && tokenExpiry && Date.now() < tokenExpiry) {
    return accessToken;
  }

  try {
    const response = await axios.post(
      SAP_TOKEN_URL,
      new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: SAP_CLIENT_ID,
        client_secret: SAP_CLIENT_SECRET,
      }),
      {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      }
    );

    accessToken = response.data.access_token;
    tokenExpiry = Date.now() + (response.data.expires_in * 1000) - 60000; // Refresh 1 min early

    return accessToken;
  } catch (error) {
    throw new Error(`Failed to get OAuth token: ${error.message}`);
  }
}

// Make SAP OData API request
async function sapApiRequest(endpoint, params = {}) {
  if (MOCK_MODE) {
    await mockDelay();

    // Return mock data based on endpoint
    if (endpoint.includes('BusinessPartner')) {
      return { d: { results: MOCK_DATA.businessPartners } };
    } else if (endpoint.includes('SalesOrder')) {
      return { d: { results: MOCK_DATA.salesOrders } };
    } else if (endpoint.includes('Material')) {
      return { d: { results: MOCK_DATA.materials } };
    } else if (endpoint.includes('PackagingOrder')) {
      return { d: { results: MOCK_DATA.packagingOrders } };
    }

    return { d: { results: [] } };
  }

  const token = await getAccessToken();
  const url = `${SAP_BTP_HOST}${endpoint}`;

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
      params,
    });

    return response.data;
  } catch (error) {
    throw new Error(`SAP API request failed: ${error.message}`);
  }
}

// Create MCP server
const server = new Server(
  {
    name: 'sap-backend-server',
    version: '1.0.0',
  },
  {
    capabilities: {
      tools: {},
      resources: {},
    },
  }
);

// List available tools
server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    {
      name: 'sap_get_business_partners',
      description: 'Get business partners from SAP. Optional filters: name, country, customerGroup',
      inputSchema: {
        type: 'object',
        properties: {
          filter: {
            type: 'string',
            description: 'OData filter query (e.g., "Country eq \'US\'")',
          },
          top: {
            type: 'number',
            description: 'Maximum number of results to return (default: 50)',
          },
        },
      },
    },
    {
      name: 'sap_get_sales_orders',
      description: 'Get sales orders from SAP. Optional filters: soldToParty, status, dateRange',
      inputSchema: {
        type: 'object',
        properties: {
          filter: {
            type: 'string',
            description: 'OData filter query',
          },
          top: {
            type: 'number',
            description: 'Maximum number of results (default: 50)',
          },
        },
      },
    },
    {
      name: 'sap_get_materials',
      description: 'Get materials and stock information from SAP',
      inputSchema: {
        type: 'object',
        properties: {
          filter: {
            type: 'string',
            description: 'OData filter query',
          },
          top: {
            type: 'number',
            description: 'Maximum number of results (default: 50)',
          },
        },
      },
    },
    {
      name: 'sap_get_packaging_orders',
      description: 'Get packaging orders from SAP (custom endpoint)',
      inputSchema: {
        type: 'object',
        properties: {
          status: {
            type: 'string',
            description: 'Filter by status (Requested, Approved, Error, Rejected)',
          },
          material: {
            type: 'string',
            description: 'Filter by material number',
          },
        },
      },
    },
    {
      name: 'sap_create_sales_order',
      description: 'Create a new sales order in SAP (mock mode only)',
      inputSchema: {
        type: 'object',
        properties: {
          soldToParty: {
            type: 'string',
            description: 'Business partner ID',
          },
          items: {
            type: 'array',
            description: 'Order items',
            items: {
              type: 'object',
              properties: {
                material: { type: 'string' },
                quantity: { type: 'number' },
              },
            },
          },
        },
        required: ['soldToParty', 'items'],
      },
    },
  ],
}));

// Handle tool execution
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    switch (name) {
      case 'sap_get_business_partners': {
        const endpoint = `${process.env.SAP_ODATA_SERVICE_ROOT}${process.env.SAP_API_BUSINESS_PARTNER}/A_BusinessPartner`;
        const params = {
          $format: 'json',
          $top: args.top || 50,
        };
        if (args.filter) {
          params.$filter = args.filter;
        }

        const data = await sapApiRequest(endpoint, params);

        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(data.d?.results || data, null, 2),
            },
          ],
        };
      }

      case 'sap_get_sales_orders': {
        const endpoint = `${process.env.SAP_ODATA_SERVICE_ROOT}${process.env.SAP_API_SALES_ORDER}/A_SalesOrder`;
        const params = {
          $format: 'json',
          $top: args.top || 50,
        };
        if (args.filter) {
          params.$filter = args.filter;
        }

        const data = await sapApiRequest(endpoint, params);

        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(data.d?.results || data, null, 2),
            },
          ],
        };
      }

      case 'sap_get_materials': {
        const endpoint = `${process.env.SAP_ODATA_SERVICE_ROOT}${process.env.SAP_API_MATERIAL}/A_MaterialStock`;
        const params = {
          $format: 'json',
          $top: args.top || 50,
        };
        if (args.filter) {
          params.$filter = args.filter;
        }

        const data = await sapApiRequest(endpoint, params);

        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(data.d?.results || data, null, 2),
            },
          ],
        };
      }

      case 'sap_get_packaging_orders': {
        let orders = MOCK_DATA.packagingOrders;

        if (args.status) {
          orders = orders.filter(o => o.Status === args.status);
        }
        if (args.material) {
          orders = orders.filter(o => o.Material === args.material);
        }

        if (MOCK_MODE) {
          await mockDelay();
        }

        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(orders, null, 2),
            },
          ],
        };
      }

      case 'sap_create_sales_order': {
        if (!MOCK_MODE) {
          throw new Error('Create operations are only available in mock mode');
        }

        await mockDelay();

        const newOrder = {
          SalesOrder: `${100000 + Math.floor(Math.random() * 10000)}`,
          SoldToParty: args.soldToParty,
          NetAmount: `${Math.floor(Math.random() * 100000)}.00`,
          Currency: 'EUR',
          Status: 'Requested',
          CreatedAt: new Date().toISOString(),
        };

        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(newOrder, null, 2),
            },
          ],
        };
      }

      default:
        throw new Error(`Unknown tool: ${name}`);
    }
  } catch (error) {
    return {
      content: [
        {
          type: 'text',
          text: `Error: ${error.message}`,
        },
      ],
      isError: true,
    };
  }
});

// List available resources
server.setRequestHandler(ListResourcesRequestSchema, async () => ({
  resources: [
    {
      uri: 'sap://connection-status',
      name: 'SAP Connection Status',
      description: 'Check SAP backend connection status and configuration',
      mimeType: 'application/json',
    },
  ],
}));

// Read resource
server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
  const { uri } = request.params;

  if (uri === 'sap://connection-status') {
    const status = {
      mode: MOCK_MODE ? 'mock' : 'production',
      host: SAP_BTP_HOST,
      timestamp: new Date().toISOString(),
      configured: !!SAP_CLIENT_ID && !!SAP_CLIENT_SECRET,
    };

    return {
      contents: [
        {
          uri,
          mimeType: 'application/json',
          text: JSON.stringify(status, null, 2),
        },
      ],
    };
  }

  throw new Error(`Unknown resource: ${uri}`);
});

// Start server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);

  console.error('SAP Backend MCP server running');
  console.error(`Mode: ${MOCK_MODE ? 'MOCK' : 'PRODUCTION'}`);
}

main().catch((error) => {
  console.error('Server error:', error);
  process.exit(1);
});
