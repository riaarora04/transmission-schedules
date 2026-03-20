# Order Empty Returnable Materials - Partner Portal

A fully functional SAP Fiori application built with SAP UI5 for managing returnable material orders.

## Features

### ✅ List Report Page (Material Orders)
- **Smart Filter Bar** with variant management
  - Filter by Material, Plant, Exchange Partner
  - Date range picker for expected delivery
  - Order status filter
  - Collapsible/pinnable filter bar

- **Tab Navigation**
  - Material Orders
  - Packaging Standard Orders (with count)

- **Responsive Table**
  - Multi-selection support
  - Sortable and filterable columns
  - Row actions for navigation
  - Displays 7 sample orders with different statuses

- **Action Buttons**
  - Create new order
  - Create multiple orders
  - Navigate to object page

### ✅ Object Page (Order Details)
- **Dynamic Page Header**
  - Order title and key information
  - Expandable/collapsible header
  - Action buttons (Edit, Approve, Reject)
  - Navigation controls (Fullscreen, Close)

- **Header Content**
  - Order status with semantic colors
  - Plant, Sales Order Number, Priority
  - Requested and Approved quantities
  - Created by and creation date

- **Object Page Sections**
  1. **General Information**: Core order details
  2. **Order Details**: Complete order information
  3. **Status History**: Visual status flow with progress indicators
  4. **Attachments**: Document management area

### ✅ Navigation & Routing
- Click-through navigation from list to detail page
- Back navigation with Shell Bar back button
- Breadcrumb navigation support

### ✅ Data Management
- Mock data with 7 sample orders
- Different order statuses: Requested, Approved, Rejected, Error
- Semantic status colors following Fiori guidelines

## Technology Stack

- **SAP UI5 (OpenUI5)** - Latest version from CDN
- **SAP Horizon Theme** - Modern Fiori theme
- **SAP UI5 Controls**:
  - `sap.m` - Main controls library
  - `sap.f` - Fiori controls (ShellBar, DynamicPage)
  - `sap.ui.table` - Table controls
  - `sap.uxap` - Object Page Layout
  - `sap.suite.ui.microchart` - Micro charts

## Project Structure

```
order-app/
├── index.html              # Application entry point
├── AppController.js        # Main application controller & routing
└── view/
    ├── ListView.js         # List Report page component
    └── ObjectPage.js       # Object Page detail component
```

## How to Run

### Option 1: Direct Browser Access
1. Open `index.html` in a modern web browser
2. The application will load directly

### Option 2: Local Web Server (Recommended)
```bash
# Using Python
cd order-app
python -m http.server 8080

# Using Node.js
npx http-server -p 8080

# Using PHP
php -S localhost:8080
```

Then open: `http://localhost:8080`

## Application Flow

1. **Initial Load**: Application displays the List Report page with Material Orders
2. **Filter Orders**: Use the filter bar to search and filter orders
3. **View Details**: Click the arrow icon in any row to navigate to the Object Page
4. **View Order Details**: See complete order information across multiple sections
5. **Navigate Back**: Click the back button in the Shell Bar to return to the list

## Sample Data

The application includes 7 sample orders with various statuses:

| Order ID | Material | Partner | Status | Priority |
|----------|----------|---------|--------|----------|
| 3094045 | HT 4904 | Rolf Motors | Requested | High |
| 3094046 | HT 1001 | Pallet World | Requested | Medium |
| 3094047 | HT 1002 | ABC Company | Requested | High |
| 3094048 | PD-105 | Westerns Pvt Ltd | Error | High |
| 3094049 | PD-106 | Westerns Pvt Ltd | Rejected | Low |
| 3094050 | PD-102 | Rolf Motors | Approved with Changes | Medium |
| 3094051 | PD-101 | Pallet World | Approved | High |

## Key Features Implementation

### Status Visualization
- **Success (Green)**: Approved orders
- **Error (Red)**: Rejected or error orders
- **Information (Blue)**: Requested/pending orders

### Status Flow
Visual progress indicator showing order lifecycle:
1. Created ✓
2. Approved (pending/complete/error)
3. In Transit (pending)
4. Delivered (pending)

### Responsive Design
- Desktop: Full layout with expanded columns
- Tablet: Optimized column widths
- Mobile: Stacked layout (via SAP UI5 responsive grid)

## Customization

### Modify Mock Data
Edit `AppController.js` → `initMockData()` function to add/modify orders.

### Add New Columns
Edit `ListView.js` → `_getTable()` function to add new `Column` definitions.

### Add New Sections
Edit `ObjectPage.js` → Add new `ObjectPageSection` in the `sections` array.

### Change Theme
Edit `index.html` → `data-sap-ui-theme="sap_horizon"` (options: sap_fiori_3, sap_belize, etc.)

## SAP Fiori Design Guidelines Compliance

✅ **Shell Bar**: Standard Fiori navigation header
✅ **Filter Bar**: Smart filter with variant management
✅ **List Report**: Responsive table with actions
✅ **Object Page**: Dynamic page layout with sections
✅ **Color Semantics**: Proper status colors
✅ **Spacing**: Consistent margin and padding
✅ **Typography**: SAP '72' font family
✅ **Icons**: SAP icon font
✅ **Responsive**: Mobile-first design

## Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)

## Future Enhancements

- [ ] Backend integration (OData service)
- [ ] Real-time data updates
- [ ] Excel export functionality
- [ ] PDF generation for orders
- [ ] Email notifications
- [ ] Advanced search with saved views
- [ ] Batch operations (approve/reject multiple)
- [ ] Attachment upload/download
- [ ] Audit trail/change history
- [ ] User preferences persistence

## Support & Documentation

- **SAP UI5 Documentation**: https://ui5.sap.com/
- **SAP Fiori Design Guidelines**: https://experience.sap.com/fiori-design/
- **SAP Icon Explorer**: https://ui5.sap.com/test-resources/sap/m/demokit/iconExplorer/webapp/index.html

## License

This is a demonstration/prototype application for educational purposes.

## Version

**v1.0.0** - Initial production release (March 2026)

---

**Built with ❤️ using SAP UI5 and SAP Fiori Design System**
