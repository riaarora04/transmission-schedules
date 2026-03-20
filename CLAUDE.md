# Design System Rules for Figma MCP Integration

## Project Overview

This is an **SAP Fiori Horizon-themed Partner Portal** built with SAP UI5 Web Components. The project uses standalone HTML files with embedded styles and SAP's official component library.

---

## 1. Token Definitions

### SAP Fiori Design Tokens (CSS Custom Properties)

**Location:** Defined inline in `<style>` blocks, sourced from SAP UI5 Horizon theme.

**Format:** CSS Custom Properties with fallback values

```css
/* Color Tokens */
--sapBackgroundColor: #f5f6f7
--sapTextColor: #1d2d3e
--sapHighlightColor: #0064d9
--sapPositiveTextColor: #256f3a
--sapNegativeTextColor: #aa0808
--sapNeutralTextColor: #1d2d3e

/* Object Header Tokens */
--sapObjectHeader_Background: white
--sapObjectHeader_Title_TextColor: #1d2d3e
--sapObjectHeader_Title_FontSize: 1.5rem
--sapObjectHeader_Title_FontFamily: '72-Black'
--sapObjectHeader_BorderColor: #d9d9d9

/* Button Tokens */
--sapButton_Success_Background: #2da44e
--sapButton_Negative_Background: #d73a49
--sapButton_Emphasized_Background: #0070f2
--sapButton_Emphasized_BorderColor: #0070f2

/* Tab Tokens */
--sapTab_TextColor: #1d2d3e
--sapTab_Selected_TextColor: #0064d9
--sapTab_ForegroundColor: #0064d9

/* Content Tokens */
--sapContent_HeaderShadow: (shadow definition)
--sapContent_ForegroundBorderColor: #758ca4
--sapContent_LabelColor: #556b82
--sapContent_Shadow0: (shadow definition)

/* Field/Input Tokens */
--sapField_BorderColor: #e5e5e5

/* Group/Container Tokens */
--sapGroup_TitleBackground: white
--sapGroup_TitleBorderColor: #a8b3bd
```

**Usage Pattern:**

```css
.element {
    background: var(--sapBackgroundColor, #f5f6f7);
    color: var(--sapTextColor, #1d2d3e);
}
```

**Token Transformation:** Tokens are provided by SAP UI5 Horizon theme and applied via CSS variables. Always include fallback values.

---

## 2. Component Library

### SAP UI5 Web Components

**Location:** Imported via CDN from `@ui5/webcomponents`

**Component Architecture:** Web Components (Custom Elements)

**Available Components:**

#### Core Components (`@ui5/webcomponents/dist/`)
- `Button` - Primary, secondary, and transparent buttons
- `Input` - Text input fields with suggestions
- `Label` - Form labels
- `Select` / `Option` - Dropdown selectors
- `CheckBox` - Checkboxes
- `DatePicker` - Date input with calendar
- `Table` / `TableColumn` / `TableRow` / `TableCell` - Data tables
- `Icon` - SAP icon font icons
- `Link` - Hyperlinks
- `Avatar` - User profile avatars

#### Fiori Components (`@ui5/webcomponents-fiori/dist/`)
- `ShellBar` - Application header with navigation
- `Bar` - Generic bar component

**Import Pattern:**

```html
<script type="module">
    import "@ui5/webcomponents/dist/Assets.js";
    import "@ui5/webcomponents-fiori/dist/Assets.js";
    import "@ui5/webcomponents/dist/Button.js";
    import "@ui5/webcomponents/dist/Input.js";
    // ... more components
</script>
```

**Usage Pattern:**

```html
<!-- Buttons -->
<ui5-button design="Emphasized">Go</ui5-button>
<ui5-button design="Default">Create</ui5-button>
<ui5-button design="Transparent">Cancel</ui5-button>

<!-- Inputs with Labels -->
<div class="filter-field">
    <ui5-label for="material">Material:</ui5-label>
    <ui5-input id="material" show-suggestions></ui5-input>
</div>

<!-- Tables -->
<ui5-table sticky-column-header>
    <ui5-table-column slot="columns">Header</ui5-table-column>
    <ui5-table-row>
        <ui5-table-cell>Data</ui5-table-cell>
    </ui5-table-row>
</ui5-table>
```

**Button Design Types:**
- `Emphasized` - Primary actions (blue background)
- `Default` - Secondary actions (outlined)
- `Transparent` - Tertiary actions (no border)

**Component Documentation:** https://ui5.sap.com/#/controls

---

## 3. Frameworks & Libraries

### UI Framework
**Type:** Vanilla HTML with SAP UI5 Web Components
- No React, Vue, or Angular
- Pure Web Components (Custom Elements API)
- Progressive enhancement approach

### Styling Framework
**Type:** CSS Custom Properties + Inline Styles
- SAP Fiori Horizon Theme via CDN
- CSS Custom Properties (Design Tokens)
- No CSS preprocessors (Sass/Less)
- No CSS-in-JS libraries

### Build System
**Type:** None (Static HTML)
- No bundler required
- Direct browser loading
- ES6 modules for Web Components

### SAP UI5 Core
**CDN:** `https://sdk.openui5.org/resources/sap-ui-core.js`

**Configuration:**
```html
<script src="https://sdk.openui5.org/resources/sap-ui-core.js"
    id="sap-ui-bootstrap"
    data-sap-ui-libs="sap.m,sap.f,sap.ui.table"
    data-sap-ui-theme="sap_horizon"
    data-sap-ui-compatVersion="edge"
    data-sap-ui-async="true">
</script>
```

**Key Libraries:**
- `sap.m` - Main controls library
- `sap.f` - Fiori controls (ShellBar, DynamicPage, etc.)
- `sap.ui.table` - Table controls

---

## 4. Asset Management

### Images & Assets
**Storage:** Direct URLs or embedded as data URIs
- No local asset directory structure
- Assets referenced from Figma MCP server (temporary 7-day URLs)
- Pattern: `https://www.figma.com/api/mcp/asset/{asset-id}`

**Usage Pattern from Figma MCP:**
```javascript
const imgBackground = "https://www.figma.com/api/mcp/asset/18063a63-cdbf-4882-ae25-6c2e7dfc8f1b";

// In HTML
<img src={imgBackground} alt="" />
```

**⚠️ Important:** Figma MCP assets expire after 7 days. For production:
1. Download assets from Figma MCP URLs
2. Store in project asset directory
3. Update references to local paths

**Asset Optimization:** None currently implemented
- Consider adding image optimization in production
- WebP/AVIF format support
- Lazy loading for images

**CDN Configuration:** Uses SAP UI5 CDN for components and theme assets

---

## 5. Icon System

### SAP Icon Font

**Location:** Provided by SAP UI5 Web Components
**Format:** Icon font with named icons

**Usage Pattern:**

```html
<!-- Via ui5-icon component -->
<ui5-icon name="nav-back"></ui5-icon>
<ui5-icon name="bell"></ui5-icon>
<ui5-icon name="settings"></ui5-icon>

<!-- In buttons -->
<ui5-button icon="slim-arrow-down" design="Transparent"></ui5-button>
<ui5-button icon="slim-arrow-right" design="Transparent"></ui5-button>
<ui5-button icon="collapse" design="Default"></ui5-button>
<ui5-button icon="pushpin-off" design="Default"></ui5-button>
```

**Common Icons:**
- `nav-back` - Back navigation arrow
- `bell` - Notifications
- `settings` - Settings gear
- `employee` - User/avatar
- `slim-arrow-down` - Dropdown indicator
- `slim-arrow-right` - Navigation arrow
- `collapse` - Collapse control
- `pushpin-off` - Pin toggle
- `overflow` - More actions (⋮)

**Icon Reference:** https://ui5.sap.com/test-resources/sap/m/demokit/iconExplorer/webapp/index.html

**Naming Convention:**
- Lowercase with hyphens
- Descriptive names (e.g., `slim-arrow-right`, not `arrow-1`)
- No custom icons currently - use SAP icon font only

---

## 6. Styling Approach

### CSS Methodology
**Type:** BEM-inspired with SAP Fiori conventions
- Component-scoped classes (e.g., `.filter-bar`, `.table-toolbar`)
- Utility classes for common patterns (e.g., `.text-bold`, `.text-right`)
- No CSS Modules or Styled Components

**Class Naming Convention:**
```css
/* Component blocks */
.filter-bar { }
.filter-bar-header { }
.filter-variant-title { }
.filter-fields { }
.filter-field { }

/* Table components */
.table-wrapper { }
.table-toolbar { }
.table-title { }
.table-actions { }

/* Status variants */
.status-requested { }
.status-error { }
.status-rejected { }
.status-approved { }

/* Utility classes */
.text-bold { font-weight: bold; }
.text-right { text-align: right; }
.row-highlight { border-left: 6px solid var(--sapHighlightColor); }
```

### Global Styles
**Location:** In `<style>` block at document head

```css
/* Reset */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

/* Base typography */
html, body {
    height: 100%;
    font-family: '72', '72full', Arial, Helvetica, sans-serif;
    background: var(--sapBackgroundColor, #f5f6f7);
    color: var(--sapTextColor, #1d2d3e);
}
```

### Responsive Design
**Approach:** Media queries with mobile-first principles

```css
/* Responsive breakpoint at 1200px */
@media (max-width: 1200px) {
    .filter-bar,
    .tab-container,
    .content-area {
        padding-left: 1.5rem;
        padding-right: 1.5rem;
    }
}
```

**Spacing Scale:**
- Use `rem` units for consistency
- Base unit: `1rem` = 16px
- Common values: `0.25rem`, `0.5rem`, `0.75rem`, `1rem`, `1.5rem`, `2rem`, `3rem`

### Component Part Customization
**Pattern:** CSS Custom Properties on Web Components

```css
/* Customize ui5-shellbar */
ui5-shellbar {
    --_ui5_shellbar_height: 2.75rem;
}

/* Style slotted content */
ui5-table::part(table) {
    border-collapse: collapse;
}
```

---

## 7. Project Structure

### Current Organization

```
/Desktop/Claudetes/
├── .claude/                    # Claude Code configuration
│   └── projects/              # Project-specific settings
├── packaging-order-view.html  # Custom CSS version
├── packaging-order-view-ui5.html  # SAP UI5 Web Components version
└── tic-tac-toe.html           # Example game application
```

### Recommended Structure for Larger Projects

```
/project-root/
├── assets/
│   ├── icons/                 # Custom icons (if any)
│   ├── images/               # Images and graphics
│   └── fonts/                # Custom fonts
├── components/
│   ├── shell-bar/            # Shell bar component
│   ├── filter-bar/           # Filter bar component
│   ├── data-table/           # Table component
│   └── shared/               # Shared components
├── styles/
│   ├── tokens.css            # Design token definitions
│   ├── global.css            # Global styles
│   └── utilities.css         # Utility classes
├── pages/
│   ├── order-view.html       # Order view page
│   └── dashboard.html        # Dashboard page
├── scripts/
│   └── app.js                # Application logic
└── index.html                # Entry point
```

### Feature Organization Pattern
**Pattern:** Page-based organization for standalone HTML apps

For each major feature/page:
1. Self-contained HTML file
2. Embedded or linked styles
3. Component imports at top
4. Minimal JavaScript for interactivity

---

## Figma MCP Integration Guidelines

### 1. Component Mapping

When implementing Figma designs, map to SAP UI5 components:

| Figma Component | SAP UI5 Component | Notes |
|----------------|-------------------|-------|
| Button | `<ui5-button>` | Use `design` prop for variants |
| Input Field | `<ui5-input>` + `<ui5-label>` | Wrap in container with label |
| Checkbox | `<ui5-checkbox>` | Built-in checked state |
| Select/Dropdown | `<ui5-select>` + `<ui5-option>` | Options as children |
| Date Picker | `<ui5-date-picker>` | Built-in calendar |
| Table | `<ui5-table>` | Use column/row/cell structure |
| Shell Bar | `<ui5-shellbar>` | Use slots for custom content |
| Icon | `<ui5-icon>` | Use `name` prop with icon name |

### 2. Design Token Application

**From Figma to Code:**

```javascript
// Figma design context provides:
Shell/sapShell_InteractiveTextColor: #1D2D3E
Button/Emphasized/sapButton_Emphasized_Background: #0070F2

// Apply in CSS:
.my-element {
    color: var(--sapShell_InteractiveTextColor, #1d2d3e);
    background: var(--sapButton_Emphasized_Background, #0070f2);
}
```

### 3. Layout Patterns

**Container Padding:**
- Desktop: `3rem` (48px) horizontal padding
- Mobile: `1.5rem` (24px) horizontal padding

**Component Spacing:**
- Between sections: `1rem` (16px)
- Between form fields: `1rem` (16px)
- Between buttons: `0.5rem` (8px)

**Heights:**
- Shell bar: `2.75rem` (44px)
- Toolbar: `2.75rem` (44px)
- Input fields: `1.625rem` (26px)
- Buttons (compact): `1.625rem` (26px)

### 4. Color Application

**Semantic Colors:**
```css
/* Success/Positive */
.status-approved {
    color: var(--sapPositiveTextColor, #256f3a);
}

/* Error/Negative */
.status-error,
.status-rejected {
    color: var(--sapNegativeTextColor, #aa0808);
}

/* Neutral */
.status-requested {
    color: var(--sapNeutralTextColor, #1d2d3e);
}

/* Highlight */
.row-highlight {
    border-left-color: var(--sapHighlightColor, #0064d9);
}
```

### 5. Typography Scale

**Font Family:**
```css
font-family: '72', '72full', Arial, Helvetica, sans-serif;
```

**Font Sizes:**
- Title (H1): `1.5rem` (24px) - `font-family: '72-Black'`
- Subtitle (H2): `1rem` (16px) - `font-weight: bold`
- Body: `0.875rem` (14px) - `font-weight: normal`
- Small: `0.75rem` (12px)

**Font Weights:**
- Light: 300
- Regular: 400
- Semibold: 600
- Bold: 700
- Black: 900

### 6. Shadow System

```css
/* Content shadows */
box-shadow: var(--sapContent_Shadow0);
box-shadow: var(--sapContent_HeaderShadow);

/* Custom shadows for elevation */
box-shadow: 0 2px 2px rgba(85, 107, 130, 0.05); /* Light shadow */
box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);     /* Heavy shadow */
```

### 7. Border Radius

```css
/* Standard corners */
border-radius: 0.25rem; /* 4px - inputs */
border-radius: 0.5rem;  /* 8px - buttons */
border-radius: 0.75rem; /* 12px - cards */
border-radius: 1.125rem; /* 18px - search field */

/* Pills/circles */
border-radius: 50%; /* avatars, status indicators */
```

---

## Best Practices for Figma-to-Code Workflow

### 1. Always Use SAP UI5 Components First
✅ **Do:**
```html
<ui5-button design="Emphasized">Create</ui5-button>
```

❌ **Don't:**
```html
<button class="custom-button">Create</button>
```

### 2. Apply Design Tokens Consistently
✅ **Do:**
```css
.element {
    background: var(--sapObjectHeader_Background, white);
    color: var(--sapTextColor, #1d2d3e);
}
```

❌ **Don't:**
```css
.element {
    background: #ffffff;
    color: #1d2d3e;
}
```

### 3. Use Semantic Class Names
✅ **Do:**
```css
.filter-bar-header { }
.table-toolbar { }
.status-approved { }
```

❌ **Don't:**
```css
.header1 { }
.toolbar-123 { }
.green-text { }
```

### 4. Handle Figma Assets Properly
When `get_design_context` returns assets:

```javascript
// 1. Extract asset URLs
const imgBackground = "https://www.figma.com/api/mcp/asset/xxx";

// 2. Use in HTML
<img src={imgBackground} alt="Background" />

// 3. For production: Download and store locally
// wget {url} -O assets/images/background.png
// Update reference: <img src="assets/images/background.png" />
```

### 5. Maintain Component Hierarchy
Follow SAP Fiori patterns:
```html
<div id="app">
    <ui5-shellbar><!-- Navigation --></ui5-shellbar>
    <div class="filter-bar"><!-- Filters --></div>
    <div class="tab-container"><!-- Tabs --></div>
    <div class="content-area"><!-- Main content --></div>
</div>
```

### 6. Test Responsiveness
Always include responsive breakpoints:
```css
@media (max-width: 1200px) { /* Tablet */ }
@media (max-width: 768px) { /* Mobile */ }
```

### 7. Accessibility Considerations
- Use semantic HTML elements
- Include ARIA labels where needed
- Ensure keyboard navigation works
- Maintain sufficient color contrast
- Use `ui5-label` with form controls

---

## Common Patterns from Figma Designs

### Pattern 1: Filter Bar with Inputs
```html
<div class="filter-bar">
    <div class="filter-fields">
        <div class="filter-field">
            <ui5-label for="field1">Label:</ui5-label>
            <ui5-input id="field1"></ui5-input>
        </div>
        <!-- More fields -->
    </div>
    <div class="filter-actions">
        <ui5-button design="Emphasized">Go</ui5-button>
        <ui5-button design="Transparent">Adapt Filters</ui5-button>
    </div>
</div>
```

### Pattern 2: Data Table with Actions
```html
<div class="table-wrapper">
    <div class="table-toolbar">
        <div class="table-title">Title (Count)</div>
        <div class="table-actions">
            <ui5-button design="Default">Action</ui5-button>
        </div>
    </div>
    <ui5-table sticky-column-header>
        <!-- Columns and rows -->
    </ui5-table>
</div>
```

### Pattern 3: Status Flow Visualization
```html
<div class="status-flow">
    <div class="status-indicator complete">✓</div>
    <div class="status-separator"></div>
    <div class="status-indicator empty"></div>
    <div class="status-separator"></div>
    <div class="status-indicator empty"></div>
</div>
```

### Pattern 4: Tab Navigation
```html
<div class="tab-container">
    <a href="#" class="tab-item">Tab 1</a>
    <a href="#" class="tab-item active">Tab 2</a>
</div>

<style>
.tab-item.active {
    color: var(--sapTab_Selected_TextColor);
    border-bottom-color: var(--sapTab_ForegroundColor);
}
</style>
```

---

## Troubleshooting

### Issue: Components Not Rendering
**Cause:** Missing Web Component imports
**Solution:** Ensure all components are imported:
```html
<script type="module">
    import "@ui5/webcomponents/dist/Button.js";
</script>
```

### Issue: Styles Not Applied
**Cause:** Missing theme initialization
**Solution:** Verify SAP UI5 Core is loaded with correct theme:
```html
<script src="https://sdk.openui5.org/resources/sap-ui-core.js"
    data-sap-ui-theme="sap_horizon">
</script>
```

### Issue: Design Tokens Not Working
**Cause:** Theme not loaded or incorrect CSS variable syntax
**Solution:** Use proper CSS custom property syntax with fallbacks:
```css
color: var(--sapTextColor, #1d2d3e);
```

### Issue: Icons Not Showing
**Cause:** Incorrect icon name or missing icon assets
**Solution:** Check icon explorer and use correct names:
```html
<ui5-icon name="slim-arrow-right"></ui5-icon>
```

---

## References

- **SAP UI5 Web Components:** https://ui5.sap.com/
- **SAP Icon Explorer:** https://ui5.sap.com/test-resources/sap/m/demokit/iconExplorer/webapp/index.html
- **Figma MCP Server Docs:** https://developers.figma.com/docs/figma-mcp-server/
- **SAP Fiori Design Guidelines:** https://experience.sap.com/fiori-design/

---

## Version History

- **v1.0** (2026-03-12): Initial design system rules based on packaging order view implementation
