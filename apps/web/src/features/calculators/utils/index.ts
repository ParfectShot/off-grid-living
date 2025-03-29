// Export calculator utilities

/**
 * Calculate the total watt-hours from a list of appliances
 */
export const calculateTotalWattHours = (appliances: Array<{ watts: number; hoursPerDay: number }>) => {
  return appliances.reduce((total, appliance) => {
    return total + (appliance.watts * appliance.hoursPerDay);
  }, 0);
};

/**
 * Calculate the number of solar panels needed based on daily usage and average sun hours
 */
export const calculateSolarPanelsNeeded = (
  dailyUsage: number,
  panelWattage: number,
  averageSunHours = 5,
  efficiencyLoss = 0.8 // 20% efficiency loss
) => {
  const adjustedUsage = dailyUsage / efficiencyLoss;
  const dailyWattageNeeded = adjustedUsage / averageSunHours;
  return Math.ceil(dailyWattageNeeded / panelWattage);
}; 