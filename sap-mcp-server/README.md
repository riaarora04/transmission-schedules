# SAP Backend MCP Server

MCP server for integrating SAP BTP (Business Technology Platform) backend services with Claude Code.

## Features

- ✅ **OAuth 2.0 Authentication** - Secure token-based authentication
- ✅ **OData API Integration** - Connect to SAP OData services
- ✅ **Mock Development Mode** - Test without real SAP backend
- ✅ **Business Partners** - Query business partner data
- ✅ **Sales Orders** - Access sales order information
- ✅ **Materials & Stock** - Check material stock levels
- ✅ **Packaging Orders** - Custom packaging order queries

## Setup

### 1. Install Dependencies

```bash
cd sap-mcp-server
npm install
```

### 2. Configure Environment

Copy `.env.example` to `.env` and configure your SAP credentials:

```bash
cp .env.example .env
```

Edit `.env` with your actual SAP BTP credentials:

```env
# Production Configuration
SAP_BTP_HOST=https://your-account.cfapps.eu10.hana.ondemand.com
SAP_CLIENT_ID=your-oauth-client-id
SAP_CLIENT_SECRET=your-oauth-client-secret
SAP_TOKEN_URL=https://your-account.authentication.eu10.hana.ondemand.com/oauth/token

# Development Mode (set to false for production)
MOCK_MODE=false
```

### 3. Add to Claude Code Settings

The server has been automatically added to your Claude Code configuration.

## Available Tools

### `sap_get_business_partners`
Get business partners from SAP with optional OData filters.

**Example:**
```javascript
// Get all business partners from US
filter: "Country eq 'US'"
top: 10
```

### `sap_get_sales_orders`
Query sales orders with filtering capabilities.

**Example:**
```javascript
// Get approved orders
filter: "Status eq 'Approved'"
top: 20
```

### `sap_get_materials`
Retrieve material and stock information.

**Example:**
```javascript
// Get materials with low stock
filter: "StockQuantity lt 100"
```

### `sap_get_packaging_orders`
Query packaging orders (custom endpoint).

**Example:**
```javascript
status: "Requested"
material: "MAT001"
```

### `sap_create_sales_order`
Create a new sales order (mock mode only).

**Example:**
```javascript
{
  soldToParty: "1000000",
  items: [
    { material: "MAT001", quantity: 10 }
  ]
}
```

## Resources

### `sap://connection-status`
Check current connection status and configuration.

## Development Mode

The server is currently running in **MOCK MODE** with sample data:

- 3 Business Partners (SAP SE, Acme Corp, Global Industries)
- 3 Sales Orders (various statuses)
- 3 Materials with stock levels
- 2 Packaging Orders

This allows you to develop and test without connecting to a real SAP backend.

## Switching to Production

1. Update `.env` with real SAP BTP credentials
2. Set `MOCK_MODE=false`
3. Restart Claude Code

## OData Filter Examples

```javascript
// Equality
"Country eq 'US'"

// Comparison
"NetAmount gt 50000"

// Multiple conditions
"Country eq 'DE' and Status eq 'Approved'"

// Contains (substringof)
"substringof('SAP', BusinessPartnerName)"
```

## Troubleshooting

### Authentication Errors
- Verify `SAP_CLIENT_ID` and `SAP_CLIENT_SECRET`
- Check `SAP_TOKEN_URL` is correct
- Ensure OAuth client has necessary permissions

### Connection Errors
- Verify `SAP_BTP_HOST` URL
- Check network connectivity
- Ensure firewall allows outbound HTTPS

### No Data Returned
- Check OData endpoint paths
- Verify service is published and activated
- Test with SAP Gateway client first

## Resources

- [SAP BTP Documentation](https://help.sap.com/docs/btp)
- [OData V2 Specification](https://www.odata.org/documentation/odata-version-2-0/)
- [SAP API Business Hub](https://api.sap.com/)
