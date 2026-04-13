# Manage Counting Events

A SAP Fiori Elements application for managing counting events and schedules in the returnable packaging management system.

## Features

### Counting Events
- **List Report**: View and filter all counting events
- **Object Page**: View detailed information about a counting event
- **Status Management**: Track event status (Planned, In Progress, Completed, Cancelled)
- **Actions**:
  - Complete Event
  - Cancel Event
- **Filtering**: By status, event type, counting group, date, and schedule

### Counting Schedules
- **List Report**: View and manage recurring counting schedules
- **Object Page**: View and edit schedule details
- **Schedule Patterns**: Support for monthly, yearly, and single counting events
- **Actions**:
  - Activate/Deactivate Schedule
  - Generate Events from Schedule
- **Automatic Event Generation**: Creates counting events based on schedule frequency

## Navigation

### Application Routes
1. **Counting Events List**: `/countingevents/webapp/index.html`
2. **Counting Schedules List**: `/countingevents/webapp/index.html#CountingSchedules`
3. **Launchpad**: `/countingevents/webapp/launchpad.html`

## Technical Details

### Technology Stack
- SAP Fiori Elements (List Report + Object Page)
- SAP Cloud Application Programming Model (CAP)
- OData V4
- SQLite (development)

### Service Endpoints
- **OData Service**: `/odata/v4/counting-events`
- **Entities**: CountingEvents, CountingSchedules, CountingEventItems
- **Code Lists**: EventStatus, EventType, ScheduleStatus, ScheduleFrequency
