// Export calculator types

export interface SolarSystem {
  panelWattage: number;
  numberOfPanels: number;
  batteryCapacity: number;
  inverterSize: number;
  dailyUsage: number;
  location?: {
    latitude: number;
    longitude: number;
  };
}

export interface HomeLoad {
  appliances: Array<{
    name: string;
    watts: number;
    hoursPerDay: number;
  }>;
  totalWattHours: number;
  totalAmpsNeeded: number;
} 