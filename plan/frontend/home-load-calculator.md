# Home Load Calculator Implementation Plan

## Overview
The Home Load Calculator is a key component of our Off-Grid Living application, allowing users to calculate their daily energy consumption by inputting appliances and usage patterns. This plan outlines the implementation details and component structure.

## Implementation Status: ✅ COMPLETED

## User Interface Components

### 1. Page Structure ✅
- **Header Bar**: Navigation, title, and action buttons (reset, export)
- **Main Content**: Two-column layout on desktop, single column on mobile
  - Left column: Appliance input and management
  - Right column: Results and recommendations
- **Footer**: Navigation links and continuation to Solar Calculator

### 2. Appliance Management ✅
- **Add Appliance Card**:
  - Tabbed interface with "Manual Entry" and "Common Appliances" options
  - Input fields for name, watts, hours per day, category
  - Checkbox for marking essential appliances
  - Quick-select wattage chips for common values (5W, 10W, 50W, etc.)
  - Add button for confirming entry

- **Appliances List**:
  - Tabbed categories for filtering (All, Kitchen, Lighting, etc.)
  - Table with sortable columns
  - Inline editing for watts and hours
  - Essential checkbox toggle
  - Remove button for each appliance
  - Empty state with example data loading option
  - Mobile-friendly card view for small screens

### 3. Results Display ✅
- **Energy Summary Card**:
  - Total daily consumption in Wh and kWh
  - Essential vs. non-essential breakdown with visual bars
  - Category breakdown with percentage visuals
  - System recommendations section
  - Call-to-action for Solar System Calculator

## State Management

### 1. Local State
```typescript
// Main component state
const [appliances, setAppliances] = useState<Appliance[]>(defaultAppliances);
const [newAppliance, setNewAppliance] = useState<Partial<Appliance>>({
  name: "",
  watts: 0,
  hoursPerDay: 1,
  category: "Other",
  essential: false,
});
const [activeCategory, setActiveCategory] = useState("all");
const [showResults, setShowResults] = useState(false);

// Derived state (calculated values)
const [totalWattHours, setTotalWattHours] = useState(0);
const [essentialWattHours, setEssentialWattHours] = useState(0);
```

### 2. Effects and Calculations
```typescript
// Calculate totals whenever appliances change
useEffect(() => {
  const total = appliances.reduce((sum, app) => sum + app.watts * app.hoursPerDay, 0);
  const essential = appliances
    .filter((app) => app.essential)
    .reduce((sum, app) => sum + app.watts * app.hoursPerDay, 0);

  setTotalWattHours(total);
  setEssentialWattHours(essential);
}, [appliances]);
```

### 3. Persistence
- Save current appliance list to localStorage
- Retrieve saved data on component mount
- Provide reset functionality to clear saved data

## Data Models

### 1. Appliance Database
```typescript
// Common appliance categories
const commonAppliances = {
  kitchen: [
    { name: "Refrigerator", watts: 150, category: "Kitchen", essential: true },
    { name: "Freezer", watts: 200, category: "Kitchen", essential: true },
    // More appliances...
  ],
  lighting: [ /* ... */ ],
  entertainment: [ /* ... */ ],
  // More categories...
};

// Default example appliances
const defaultAppliances = [
  { id: 1, name: "Refrigerator", watts: 150, hoursPerDay: 24, category: "Kitchen", essential: true },
  // More default appliances...
];
```

### 2. Calculation Functions
```typescript
// Calculate battery capacity
const calculateBatteryCapacity = (wattHours: number, daysAutonomy = 1, dod = 0.8) => {
  return Math.ceil((wattHours * daysAutonomy * 1.2) / dod);
};

// Calculate solar array size
const calculateSolarArray = (wattHours: number, sunHours = 4) => {
  return Math.ceil(wattHours / sunHours);
};
```

## Core Functionality

### 1. Appliance Management ✅
- Add new appliances with validation
- Remove existing appliances
- Update appliance properties (watts, hours, essential status)
- Filter appliances by category
- Select from common appliances database

### 2. Calculations ✅
- Real-time calculation of total energy consumption
- Category-based energy breakdown
- Essential vs. non-essential analysis
- System sizing recommendations

### 3. User Assistance ✅
- Tooltips for technical terms
- Wattage quick-select chips
- Pre-populated examples
- Common appliance database
- Validation to prevent errors

## Implementation Steps

### Phase 1: Core Structure ✅
1. Set up route and basic layout
2. Implement appliance state management
3. Create add/remove appliance functionality
4. Implement basic calculations

### Phase 2: Enhanced UI ✅
1. Build tabbed interface for appliance categories
2. Create visual breakdowns of energy usage
3. Implement filtering and sorting
4. Add common appliance database and selection

### Phase 3: Recommendations & Integration
1. Implement system recommendations logic ✅
2. Add export functionality ⏳
3. Create localStorage persistence ⏳
4. Connect with Solar System Calculator ✅ (Basic navigation link)

## UX Considerations

### Interactive Elements ✅
- Quick-select wattage chips for common values
- Tabbed interface for different categories
- Real-time calculations as values change
- Visual representation of energy breakdown

### Responsive Design ✅
- Single column layout on mobile
- Card-based appliance view for mobile screens
- Touch-friendly input elements
- Fixed position for results on large screens

### Accessibility
- Proper labeling of form elements ✅
- Keyboard navigation support ⏳
- Sufficient color contrast ⏳
- Screen reader compatible content ⏳

## Testing Strategy

### Unit Tests
- Test calculation functions
- Validate form handling logic
- Verify state management

### Integration Tests
- Test end-to-end flow from input to results
- Verify persistence functionality
- Test category filtering

### User Testing
- Verify intuitiveness of interface
- Confirm accuracy of calculations
- Test on different devices and screen sizes

## Next Steps
- [✓] Implement the UI components
- [✓] Build appliance database
- [✓] Create calculation utilities
- [✓] Make mobile-friendly appliance management
- [ ] Implement persistence logic with localStorage
- [ ] Add export functionality
- [ ] Improve accessibility
- [ ] Conduct usability testing
