# SAP MCP Quick Reference

## 🚀 Active MCP Servers (After Restart)

### 1. Fiori MCP (`fiori-mcp`) - UX Design Guidelines ⭐ NEW
```bash
✅ Fiori design guidelines
✅ Floorplan templates
✅ UX patterns
✅ Responsive design
✅ Accessibility

# Example queries:
"What Fiori floorplan for a list view?"
"Show List Report pattern"
"Fiori filter bar guidelines"
"Responsive design best practices"
```

### 2. UI5 MCP (`ui5-mcp`) - Frontend Component Help
```bash
✅ Component documentation
✅ API references
✅ Code examples
✅ Best practices
✅ Icon library

# Example queries:
"How do I use ui5-button?"
"Show ui5-table examples"
"What properties does ui5-input have?"
"SAP UI5 form layout best practices"
```

### 3. CAP MCP (`cap-mcp`) - CAP Service Integration
```bash
✅ Service discovery
✅ Entity operations
✅ OData queries
✅ Schema inspection

# Example queries:
"List CAP services"
"Query orders from CAP"
"Create entity in CAP service"
"Show schema for service X"
```

### 4. SAP Backend MCP (`sap-mcp-server`) - BTP Integration
```bash
✅ OAuth 2.0 auth
✅ Business partners
✅ Sales orders
✅ Materials & stock
✅ Mock mode enabled

# Example queries:
"Get business partners"
"Show sales orders"
"Get materials with stock > 100"
"Show packaging orders"
```

## 📋 Your Project Stack

```
┌─────────────────────────────────────────────┐
│  UX Design: SAP Fiori Guidelines ⭐ NEW     │
│  └─ fiori-mcp → Design patterns & layouts   │
└─────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────┐
│  Frontend: SAP UI5 Web Components           │
│  ├─ packaging-order-view.html               │
│  ├─ CLAUDE.md (design system rules)         │
│  └─ ui5-mcp → Component docs & examples     │
└─────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────┐
│  Backend Options:                            │
│  ├─ cap-mcp → Local CAP services            │
│  └─ sap-mcp-server → SAP BTP (mock/prod)    │
└─────────────────────────────────────────────┘
```

## 🎯 Common Tasks

### Designing UX (Fiori MCP) ⭐ NEW
```bash
"What Fiori floorplan for packaging order management?"
"Show me List Report design guidelines"
"How should I structure my Object Page?"
"Fiori responsive layout recommendations"
"Accessibility requirements for my form"
```

### Building UI Components (UI5 MCP)
```bash
"Create a filter bar with date picker and status selector"
"Build a responsive data table with actions"
"Add form validation to input fields"
"Implement a multi-step wizard"
```

### Querying Data (Backend MCP)
```bash
# Use sap-mcp-server (mock data available)
"Get all packaging orders"
"Show approved sales orders"
"List business partners from Germany"
```

### CAP Development (CAP MCP)
```bash
# Use cap-mcp (requires running CAP service)
"Show available services"
"Query Books entity"
"Create new order"
```

## 🔧 Configuration Files

```
/Desktop/Claudetes/
├── .claude.json              # MCP servers: ui5-mcp, cap-mcp
├── CLAUDE.md                 # Design system rules
├── SAP-MCP-SETUP.md         # Full documentation
└── sap-mcp-server/
    ├── .env                  # Backend config (MOCK_MODE=true)
    ├── index.js              # MCP server code
    └── README.md             # Backend docs
```

## ⚡ Quick Commands

```bash
# After restart
"List MCP servers"              → See all active servers
"What Fiori patterns exist?"    → Check Fiori MCP ⭐ NEW
"ui5-mcp status"                → Check UI5 MCP
"Show mock data"                → Get sample data
"Help with ui5-table"           → Get component help
```

## 🎨 Design System Integration

Your `CLAUDE.md` already has:
- ✅ SAP Fiori Horizon tokens
- ✅ UI5 Web Components library
- ✅ Component usage patterns
- ✅ Styling conventions

Now with all four MCP servers, Claude can:
- ✅ **Fiori MCP**: Recommend proper Fiori floorplans and patterns ⭐ NEW
- ✅ **UI5 MCP**: Reference official UI5 documentation
- ✅ **UI5 MCP**: Provide up-to-date examples
- ✅ **UI5 MCP**: Suggest best practices
- ✅ **UI5 MCP**: Validate component usage
- ✅ **CAP MCP**: Connect to CAP services
- ✅ **Backend MCP**: Query SAP data

## 📱 Development Workflow

### Phase 1: Design ⭐ NEW
```bash
1. "What Fiori pattern for my use case?"
2. "Show me the recommended layout"
3. "How should I organize my filter bar?"
```

### Phase 2: Implement
```bash
4. "Help me build the filter bar with UI5"
5. "Create the table with proper columns"
6. "Add button actions"
```

### Phase 3: Connect
```bash
7. "Fetch data from CAP service"
8. "Or: Get mock data from backend"
9. "Bind data to table"
```

### Phase 4: Validate
```bash
10. "Does this follow Fiori guidelines?"
11. "Is it accessible?"
12. "Is it responsive?"
```

## 📱 Next Steps

1. **Restart Claude Code** to activate all four MCP servers
2. **Test Fiori MCP**: `"What Fiori floorplans are available?"` ⭐ NEW
3. **Test UI5 MCP**: `"Show me ui5-button documentation"`
4. **Test Backend**: `"Get mock business partners"`
5. **Build Feature**: `"Help me design and build a filter form for packaging orders"`

---

**Ready to go!** Restart Claude Code and start building with full SAP stack support. 🚀

## 🌟 Why This Setup is Powerful

You now have the **complete SAP development toolkit**:

1. **`fiori-mcp`** ⭐ - Ensures your design follows SAP standards
2. **`ui5-mcp`** - Helps you implement with the right components
3. **`cap-mcp`** - Connects you to your data services
4. **`sap-mcp-server`** - Provides backend integration

This is the **full SAP stack** in Claude Code! 🎯
