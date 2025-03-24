# Off-Grid Living Application - Calculators Implementation Plan

## Overview
This document outlines the implementation plan for the calculators section of the Off-Grid Living application. The calculators are a key feature of the MVP, allowing users to plan their off-grid energy systems.

## Calculators Structure

### 1. Calculators Listing Page (`/calculators`) ✅
A clean, informative page that showcases both calculator options:
- Home Load Calculator with description and features
- Solar System Calculator with description and features
- Each with a clear call-to-action button

### 2. Home Load Calculator (`/calculators/home-load`) ✅
A detailed, user-friendly calculator with:
- Intuitive input methods for adding appliances
- Real-time energy consumption calculations
- Visual breakdowns of energy usage
- Practical recommendations based on calculations

### 3. Solar System Calculator (`/calculators/solar-system`) ⏳
A companion calculator that helps design a solar power system based on:
- Energy requirements (can be imported from Home Load Calculator)
- Location-specific solar data
- Battery storage needs
- System component recommendations

## Route Structure

```
/calculators
  - index.tsx (Listing page) ✅
  /home-load
    - index.tsx (Home Load Calculator) ✅
  /solar-system
    - index.tsx (Solar System Calculator - Basic placeholder implemented) ⏳
```

## Data Models

### Home Load Calculator

```typescript
// Appliance type
interface Appliance {
  id: number;
  name: string;
  watts: number;
  hoursPerDay: number;
  category: string;
  essential: boolean;
}

// Calculation results
interface HomeLoadResults {
  totalWattHours: number;
  essentialWattHours: number;
  categoryBreakdown: Record<string, number>;
  recommendations: {
    batteryCapacity: {
      total: number;
      essential: number;
    };
    solarArraySize: number;
  };
}
```

### Solar System Calculator

```typescript
// Solar system configuration
interface SolarSystemConfig {
  dailyEnergyUse: number;
  location: {
    lat: number;
    lng: number;
    averageSunHours: number;
  };
  systemLosses: number;
  daysOfAutonomy: number;
  batteryDOD: number; // Depth of discharge
}

// Solar system results
interface SolarSystemResults {
  panelWattage: number;
  numberOfPanels: number;
  batteryCapacity: number;
  inverterSize: number;
  estimatedCost: {
    panels: number;
    batteries: number;
    inverter: number;
    total: number;
  };
}
```

## Component Architecture

### Shared Components
- `CalculatorLayout`: Consistent layout for calculator pages
- `ApplianceTable`: Reusable table for displaying appliances
- `EnergyBreakdown`: Visual representation of energy usage
- `WattageSelector`: Component for selecting common wattages
- `CategoryFilter`: Filter component for organizing appliances by category

### Home Load Calculator Components
- `ApplianceForm`: Form for adding new appliances
- `CommonApplianceSelector`: Selection tool for predefined appliances
- `ResultsSummary`: Display of calculation results
- `SystemRecommendations`: Recommendations based on calculations

### Solar System Calculator Components
- `LocationSelector`: Tool for selecting location and sun hours
- `SystemParameters`: Configuration options for solar system
- `SolarArrayCalculator`: Calculator for panel requirements
- `BatteryBankCalculator`: Calculator for storage requirements
- `CostEstimator`: Estimator for system costs

## State Management Strategy

### Local State
- Use React's `useState` and `useReducer` for form state and UI interactions
- Implement custom hooks for calculator-specific logic:
  - `useHomeLoadCalculator`
  - `useSolarSystemCalculator`

### Persistence
- Save calculator inputs and results to localStorage for user convenience
- Implement "Save Results" functionality for later reference
- Allow exporting results as PDF or CSV

### Data Sharing Between Calculators
- Enable passing Home Load Calculator results to Solar System Calculator
- Implement a context or store for sharing calculation data between routes

## User Experience Considerations

### Progressive Disclosure
- Start with simple inputs and progressively reveal advanced options
- Provide tooltips and information buttons for technical concepts
- Include expandable sections for detailed explanations

### Responsive Design
- Design mobile-first interfaces with appropriate touch targets
- Reorganize complex tables and charts for small screens
- Ensure all interactive elements are accessible on touch devices

### Guided Experience
- Implement a step-by-step flow for first-time users
- Provide example data to help users understand calculations
- Include clear calls-to-action for next steps

## Implementation Phases

### Phase 1: Basic Functionality ✅
- Implement calculator routes and basic UI
- Create core calculation logic
- Build appliance management functionality
- Implement basic results display

### Phase 2: Enhanced Features
- Add data visualization components
- Implement persistence and sharing features ⏳
- Create detailed recommendations ✅
- Add export functionality ⏳

### Phase 3: Refinement
- Optimize performance for large appliance lists
- Add animations and transitions for better UX
- Implement advanced filtering and sorting
- Add printable report generation

## Next Steps
- [✓] Complete detailed designs for calculator pages
- [✓] Implement calculator routes and components
- [✓] Create calculation utility functions
- [ ] Find and add proper images for calculator preview cards
- [ ] Build data persistence functionality
- [ ] Implement export and sharing features
- [ ] Complete Solar System Calculator
- [ ] Conduct usability testing with target users
