# SAP Fiori Partner Portal

Enterprise web applications built with SAP UI5 Web Components and Fiori Horizon theme.

## 🚀 Live Demo

**Live Site:** [https://riaarora04.github.io/transmission-schedules/](https://riaarora04.github.io/transmission-schedules/)

---

## 📦 Featured App: Manage Packaging Issues

**Direct Link:** [https://riaarora04.github.io/transmission-schedules/manage-packaging-issues/](https://riaarora04.github.io/transmission-schedules/manage-packaging-issues/)

Bulk approve or reject packaging issues with advanced filtering, status tracking, and streamlined workflow management.

---

# Manage Transmission Job Schedules (CAP Backend)

A SAP Fiori Elements application for managing transmission job schedules, built on the SAP Cloud Application Programming Model (CAP) with strict adherence to SAP Fiori Design Guidelines.

## Features

- **List Report Page**: View all transmission schedules with comprehensive filtering
- **Object Page**: Detailed view and editing of individual schedules
- **Draft Support**: Save work in progress and resume later
- **Value Helps**: Dropdown selections for all code lists
- **Criticality**: Visual indicators for status and priority
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices

## Technology Stack

### Static Web Apps (GitHub Pages)
- **UI Framework**: SAP UI5 Web Components
- **Design System**: SAP Fiori Horizon Theme
- **Styling**: CSS Custom Properties (Design Tokens)
- **Architecture**: Vanilla HTML with Web Components
- **Hosting**: GitHub Pages

### CAP Backend Application
- **Backend**: SAP Cloud Application Programming Model (CAP) v7+
- **Frontend**: SAPUI5 Fiori Elements (List Report + Object Page)
- **Database**: SQLite (development) / HANA (production)
- **Protocol**: OData V4
- **Theme**: SAP Horizon (Fiori 3.0)

## Project Structure

### Static Web Applications

```
.
├── index.html                          # Landing page with app links
├── packaging-order-view.html           # 📦 Bulk approval app (Featured)
├── packaging-orders-ui5.html           # Orders list view
├── packaging-order-create-ui5.html     # Create new order
├── packaging-order-detail-ui5.html     # Order details
├── transmission-job-schedules.html     # Job schedules UI
└── manage-transmission-jobs.html       # Job management UI
```

### CAP Backend Structure

```
/
├── app/
│   ├── transmission-schedules/     # Fiori Elements application
│   │   ├── webapp/
│   │   │   ├── manifest.json       # App configuration
│   │   │   └── i18n/               # Internationalization
│   │   └── annotations.cds         # UI annotations
│   └── index.html                   # Launchpad
├── db/
│   ├── schema.cds                   # Data model
│   └── data/                        # Initial data (CSV)
├── srv/
│   ├── catalog-service.cds          # Service definition
│   └── schedule-service.js          # Service implementation
└── package.json                     # Dependencies
```

## Data Model

### Main Entity: Schedules

| Field | Type | Description |
|-------|------|-------------|
| scheduleID | String(20) | Unique schedule identifier |
| status | Association | Schedule status (Active, Paused, etc.) |
| category | Association | Category (Invoice, Delivery, etc.) |
| issueType | Association | Issue type (Standard, Urgent, etc.) |
| soldToParty | String(10) | Sold-to party ID |
| soldToPartyName | String(100) | Sold-to party name |
| startDate | Date | Schedule start date |
| endDate | Date | Schedule end date |
| frequency | Association | Execution frequency |
| executionTime | Time | Execution time |
| description | String(255) | Schedule description |
| priority | Association | Priority level |
| assignedTo | String(100) | Assigned user |
| transmissionType | Association | Transmission type (EDI, Email, etc.) |
| recipientEmail | String(100) | Recipient email address |
| isActive | Boolean | Active flag |

### Code Lists

- **ScheduleStatus**: DRAFT, ACTIVE, PAUSED, COMPLETED, FAILED, CANCELLED
- **ScheduleCategory**: INVOICE, DELIVERY, ORDER, PAYMENT, REPORT, NOTIFICATION
- **IssueType**: STANDARD, URGENT, CORRECTION, RESUBMISSION
- **Frequency**: HOURLY, DAILY, WEEKLY, MONTHLY, ONDEMAND
- **Priority**: LOW, MEDIUM, HIGH, CRITICAL
- **TransmissionType**: EDI, EMAIL, FTP, API, MANUAL

## Installation & Setup

### Prerequisites

- Node.js 18+ or 20+
- npm 8+
- @sap/cds-dk (installed globally or via npx)

### Install Dependencies

```bash
npm install
```

### Deploy Database

```bash
npx cds deploy --to sqlite
```

This will:
- Create the SQLite database
- Initialize code list tables
- Load sample schedule data

### Start Development Server

```bash
npx cds watch
```

The server will start on an available port (e.g., http://localhost:4004 or auto-assigned).

## Accessing the Application

### Launchpad

Open the launchpad in your browser:

```
http://localhost:<port>/
```

Click the "Manage Transmission Job Schedules" tile to launch the application.

### Direct Access

Access the Fiori Elements app directly:

```
http://localhost:<port>/transmissionschedules/webapp/index.html
```

### OData Service

The OData V4 service is available at:

```
http://localhost:<port>/schedule/
```

Endpoints:
- `/schedule/$metadata` - Service metadata
- `/schedule/Schedules` - Schedules entity set
- `/schedule/ScheduleStatus` - Status code list
- `/schedule/ScheduleCategory` - Category code list
- etc.

## Using the Application

### List Report Page

1. **Filters**: Use the smart filter bar to search by:
   - Schedule ID
   - Status
   - Category
   - Issue Type
   - Sold-to Party
   - Priority
   - Date Range

2. **Table Actions**:
   - **Create**: Add a new schedule
   - **Edit**: Modify an existing schedule (opens object page)
   - **Delete**: Remove selected schedules

3. **Table Features**:
   - Sort columns by clicking headers
   - Export to Excel
   - Personalize columns
   - Save filter variants

### Object Page

The object page displays detailed schedule information organized in sections:

1. **General Information**
   - Schedule Details
   - Timing Information

2. **Transmission Details**
   - Configuration
   - Execution History

3. **Administrative Data**
   - Created by/at
   - Modified by/at

### Creating a Schedule

1. Click **Create** on the List Report page
2. Fill in required fields:
   - Schedule ID (auto-generated or manual)
   - Status (select from dropdown)
   - Category
   - Sold-to Party
   - Start Date / End Date
   - Frequency
   - Transmission Type
3. Click **Save** to create or **Cancel** to discard

### Editing a Schedule

1. Click on a schedule row in the table
2. Click **Edit** on the object page
3. Modify fields as needed
4. Click **Save** to persist changes or **Cancel** to revert

### Draft Mode

- Changes are automatically saved as drafts
- Resume editing later from where you left off
- Draft indicator shown in the header
- Discard draft to remove unsaved changes

## Customization

### Adding More Filters

Edit `app/transmission-schedules/annotations.cds`:

```cds
UI.SelectionFields : [
    scheduleID,
    status_code,
    // Add your field here
    newField
]
```

### Adding Table Columns

Edit the `UI.LineItem` annotation in `annotations.cds`:

```cds
UI.LineItem : [
    // Existing fields...
    {
        $Type : 'UI.DataField',
        Value : newField,
        Label : 'New Field'
    }
]
```

### Adding Object Page Sections

Add a new `UI.FieldGroup` and reference it in `UI.Facets`:

```cds
UI.FieldGroup #NewSection : {
    Data : [
        {
            $Type : 'UI.DataField',
            Value : newField,
            Label : 'New Field'
        }
    ]
},

UI.Facets : [
    // Existing facets...
    {
        $Type : 'UI.ReferenceFacet',
        Label : 'New Section',
        Target : '@UI.FieldGroup#NewSection'
    }
]
```

## SAP Fiori Guidelines Compliance

This application strictly follows SAP Fiori Design Guidelines:

✅ **Controls**: Only official SAPUI5 controls used (no custom HTML/CSS)
✅ **Floorplan**: List Report + Object Page pattern
✅ **Theme**: SAP Horizon (Fiori 3.0)
✅ **Tables**: Responsive Table with standard features
✅ **Filters**: Smart Filter Bar with value helps
✅ **Navigation**: Semantic routing and breadcrumbs
✅ **Draft**: Draft handling for create/edit operations
✅ **Responsive**: Mobile-first responsive design
✅ **Accessibility**: ARIA labels and keyboard navigation
✅ **i18n**: Internationalization support

### Design Tokens Used

All colors, spacing, and typography follow SAP Fiori design tokens:
- `--sapHighlightColor`: #0070f2
- `--sapPositiveTextColor`: #256f3a (success)
- `--sapNegativeTextColor`: #aa0808 (error)
- `--sapCriticalTextColor`: #e9730c (warning)
- `--sapBackgroundColor`: #f5f6f7
- Font: '72' (SAP font family)

### Criticality Mapping

**Status Criticality**:
- ACTIVE, COMPLETED → Positive (green)
- PAUSED → Critical (orange)
- FAILED → Negative (red)
- DRAFT, CANCELLED → Neutral (grey)

**Priority Criticality**:
- CRITICAL → Negative (red)
- HIGH → Critical (orange)
- MEDIUM, LOW → Neutral (grey)

## Deployment

### Production Build

```bash
cds build --production
```

### Deploy to SAP BTP

1. Create `mta.yaml` for multi-target application
2. Build MTA archive:
   ```bash
   mbt build
   ```
3. Deploy to Cloud Foundry:
   ```bash
   cf deploy mta_archives/transmission-schedules_1.0.0.mtar
   ```

### Database Migration

For production, switch from SQLite to SAP HANA:

1. Update `package.json`:
   ```json
   "cds": {
     "requires": {
       "db": {
         "kind": "hana-cloud"
       }
     }
   }
   ```

2. Deploy to HANA:
   ```bash
   cds deploy --to hana
   ```

## Testing

### Manual Testing

1. Start the app: `npx cds watch`
2. Open in browser: `http://localhost:<port>/`
3. Test CRUD operations on schedules
4. Verify filters work correctly
5. Test draft functionality
6. Check responsive design on mobile

### OData Testing

Use tools like Postman or curl to test the OData service:

```bash
# Get all schedules
curl http://localhost:4004/schedule/Schedules

# Get one schedule
curl http://localhost:4004/schedule/Schedules(ID='...')

# Filter schedules
curl "http://localhost:4004/schedule/Schedules?\$filter=status_code eq 'ACTIVE'"

# Create a schedule (POST with JSON body)
curl -X POST http://localhost:4004/schedule/Schedules \
  -H "Content-Type: application/json" \
  -d '{"scheduleID":"SCH999",...}'
```

## Troubleshooting

### Port Already in Use

If port 4004 is already in use, CDS will automatically assign a different port. Check the console output for the actual URL.

### Database Issues

Reset the database:
```bash
rm db.sqlite
npx cds deploy --to sqlite
```

### UI5 Loading Issues

Clear browser cache and reload. Ensure internet connectivity for CDN resources.

### Draft Not Working

Verify `@odata.draft.enabled` is present in `srv/catalog-service.cds`:
```cds
@odata.draft.enabled
entity Schedules as projection on db.Schedules;
```

## License

ISC

## Support

For issues or questions:
1. Check SAP Community: https://community.sap.com
2. Review CAP documentation: https://cap.cloud.sap
3. Consult Fiori guidelines: https://experience.sap.com/fiori-design/

---

**Built with ❤️ following SAP Fiori Design Guidelines**
