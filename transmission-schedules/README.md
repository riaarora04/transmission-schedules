# Manage Transmission Job Schedules

SAP Fiori application built with SAP Cloud Application Programming Model (CAP) and SAPUI5.

## Overview

This application allows users to create and manage transmission job schedules with the following features:

- **List Report Page**: View all transmission schedules with filtering and search capabilities
- **Object Page**: Detailed view and editing of individual schedules
- **Create Dialog**: Create new transmission schedules
- **Flexible Column Layout**: Modern SAP Fiori 3.0 navigation pattern

## Architecture

### Backend (CAP)
- **Database**: SQLite (for development)
- **Service**: OData V4 service with draft support
- **Entities**: Schedules, Statuses, Categories, IssueTypes, Frequencies, Priorities

### Frontend (SAPUI5)
- **Framework**: SAPUI5 1.120+ with Horizon theme
- **Floorplan**: List Report + Object Page (Flexible Column Layout)
- **Controls**: Smart Controls (SmartTable, SmartFilterBar)
- **Libraries**: sap.m, sap.f, sap.ui.comp, sap.ui.generic.app, sap.ui.table

## Features

### List Report Page
- Smart Filter Bar with multiple filter fields
- Smart Table with responsive design
- Variant management
- Table personalization
- Export to Excel functionality
- Create new schedules

### Object Page
- Dynamic Page with header
- Tabs for different information categories:
  - General Information
  - Transmission Settings
  - Contact Information
  - Execution Statistics
- Edit mode with save/cancel
- Delete functionality
- Flexible Column Layout integration

### Data Fields
- Schedule ID
- Status (with criticality)
- Priority (with criticality)
- Category
- Issue Type
- Sold-to Party information
- Date range (Start/End)
- Frequency and transmission time
- Contact details
- Execution statistics

## Installation

1. Install dependencies:
```bash
npm install
```

2. Deploy the database:
```bash
npm run deploy
```

## Running the Application

Start the CAP server:
```bash
npm start
```

The application will be available at:
- Backend: http://localhost:4004
- Frontend: http://localhost:4004/manageschedules/webapp/index.html

## Project Structure

```
transmission-schedules/
├── db/                          # Database models
│   ├── schema.cds              # Entity definitions
│   └── data/                   # Initial data (CSV)
├── srv/                        # Service layer
│   ├── service.cds             # Service definitions with annotations
│   └── server.js               # Server configuration
├── app/                        # UI applications
│   └── manageschedules/        # Main Fiori app
│       ├── webapp/
│       │   ├── controller/     # Controllers
│       │   ├── view/           # XML Views
│       │   ├── model/          # Formatters
│       │   ├── i18n/           # Internationalization
│       │   ├── css/            # Styles
│       │   ├── manifest.json   # App descriptor
│       │   ├── Component.js    # Component initialization
│       │   └── index.html      # Entry point
│       └── ui5.yaml            # UI5 configuration
└── package.json                # Project dependencies
```

## SAP Fiori Compliance

This application strictly follows SAP Fiori Design Guidelines:

✅ **Official SAPUI5 Controls Only**
- All UI controls are from SAP libraries
- No custom HTML or CSS modifications
- Smart Controls for list and filter functionality

✅ **SAP Fiori Floorplans**
- List Report pattern with filter bar
- Object Page pattern with dynamic page
- Flexible Column Layout for navigation

✅ **SAP Fiori UX Patterns**
- Horizon theme (SAP Fiori 3.0)
- Responsive design
- Proper spacing and typography
- Semantic colors and criticality
- Value help dialogs
- Message handling
- Draft support

✅ **SAP Fiori Behaviors**
- Busy indicators
- Empty states
- Navigation with routing
- Selection modes
- Required field indication
- Confirmation dialogs

## Key Annotations

The service uses comprehensive OData V4 annotations:

- `UI.SelectionFields`: Filter bar configuration
- `UI.LineItem`: Table columns with criticality
- `UI.HeaderInfo`: Object page header
- `UI.HeaderFacets`: KPI tiles in header
- `UI.Facets`: Sections and subsections
- `UI.FieldGroup`: Field grouping
- `Common.ValueList`: Value help configuration
- `Common.Text`: Text associations

## Technologies

- **SAP Cloud Application Programming Model (CAP)**: 7.5.0
- **SAPUI5**: 1.120.0+
- **Node.js**: 18+
- **OData**: V4
- **Theme**: SAP Horizon (Fiori 3.0)

## Browser Support

- Google Chrome (latest)
- Mozilla Firefox (latest)
- Microsoft Edge (latest)
- Safari (latest)

## License

ISC

## Author

SAP Fiori Development Team
