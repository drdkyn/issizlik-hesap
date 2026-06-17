export const minimumWages = [
  { date: "2026-01-01", daily: 1101.00, monthly: 33030.00, maximum: 313785.00 },
  { date: "2025-01-01", daily: 866.85, monthly: 26005.50, maximum: 195041.25 },
  { date: "2024-01-01", daily: 666.75, monthly: 20002.50, maximum: 150018.75 },
  { date: "2023-07-01", daily: 447.15, monthly: 13414.50, maximum: 100608.75 },
  { date: "2023-01-01", daily: 333.60, monthly: 10008.00, maximum: 75060.00 },
  { date: "2022-07-01", daily: 215.70, monthly: 6471.00, maximum: 48532.50 },
  { date: "2022-01-01", daily: 166.80, monthly: 5004.00, maximum: 37530.00 },
  { date: "2021-01-01", daily: 119.25, monthly: 3577.50, maximum: 26831.25 },
  { date: "2020-01-01", daily: 98.10, monthly: 2943.00, maximum: 22072.50 },
  { date: "2019-01-01", daily: 85.28, monthly: 2558.40, maximum: 19188.00 },
  { date: "2018-01-01", daily: 67.65, monthly: 2029.50, maximum: 15221.25 },
  { date: "2017-01-01", daily: 59.25, monthly: 1777.50, maximum: 13331.25 },
  { date: "2016-01-01", daily: 54.90, monthly: 1647.00, maximum: 10705.50 },
  { date: "2015-07-01", daily: 42.45, monthly: 1273.50, maximum: 8277.75 },
  { date: "2015-01-01", daily: 40.05, monthly: 1201.50, maximum: 7809.75 },
  { date: "2014-07-01", daily: 37.80, monthly: 1134.00, maximum: 7371.00 },
  { date: "2014-01-01", daily: 35.70, monthly: 1071.00, maximum: 6961.50 },
  { date: "2013-07-01", daily: 34.05, monthly: 1021.50, maximum: 6639.75 },
  { date: "2013-01-01", daily: 32.62, monthly: 978.60, maximum: 6360.90 },
  { date: "2012-07-01", daily: 31.35, monthly: 940.50, maximum: 6113.25 },
  { date: "2012-01-01", daily: 29.55, monthly: 886.50, maximum: 5762.25 },
  { date: "2011-07-01", daily: 27.90, monthly: 837.00, maximum: 5440.50 },
  { date: "2011-01-01", daily: 26.55, monthly: 796.50, maximum: 5177.25 },
  { date: "2010-07-01", daily: 25.35, monthly: 760.50, maximum: 4943.25 },
  { date: "2010-01-01", daily: 24.30, monthly: 729.00, maximum: 4738.50 },
  { date: "2009-07-01", daily: 23.10, monthly: 693.00, maximum: 4504.50 },
  { date: "2009-01-01", daily: 22.20, monthly: 666.00, maximum: 4329.00 },
  { date: "2008-07-01", daily: 21.29, monthly: 638.70, maximum: 4151.55 },
  { date: "2008-01-01", daily: 20.28, monthly: 608.40, maximum: 3954.60 },
  { date: "2007-07-01", daily: 19.50, monthly: 585.00, maximum: 3802.50 },
  { date: "2007-01-01", daily: 18.75, monthly: 562.50, maximum: 3656.25 },
  { date: "2006-01-01", daily: 17.70, monthly: 531.00, maximum: 3451.50 },
  { date: "2005-01-01", daily: 16.29, monthly: 488.70, maximum: 3176.55 },
] as const;

export function getMinimumWageByDate(year: number, month: number): typeof minimumWages[0] | null {
  const targetDate = new Date(year, month - 1, 1);
  
  let closest = minimumWages[0];
  let closestDiff = Math.abs(new Date(minimumWages[0].date).getTime() - targetDate.getTime());
  
  for (const wage of minimumWages) {
    const wageDateObj = new Date(wage.date);
    const diff = Math.abs(wageDateObj.getTime() - targetDate.getTime());
    
    if (wageDateObj <= targetDate && diff < closestDiff) {
      closest = wage;
      closestDiff = diff;
    }
  }
  
  return closest;
}
