import { getMinimumWageByDate } from './minimumWages';

export interface MonthlyWage {
  year: number;
  month: number;
  grossWage: number;
}

export interface CalculationResult {
  dailyAverage: number;
  dailyBenefit: number;
  monthlyBenefit: number;
  benefitDays: number;
  maxAllowedDaily: number;
  cappedDailyBenefit: number;
  cappedMonthlyBenefit: number;
  totalBenefitAmount: number;
  stampTaxRate: number;
  stampTaxAmount: number;
  netBenefitAmount: number;
  isEligible: boolean;
  eligibilityMessage: string;
}

export function calculateUnemploymentBenefit(
  lastFourMonths: MonthlyWage[],
  totalInsuredDays: number,
  referenceYear: number,
  referenceMonth: number
): CalculationResult {
  // Sort by date descending to get the last 4 months
  const sortedMonths = [...lastFourMonths].sort((a, b) => {
    const dateA = new Date(a.year, a.month - 1);
    const dateB = new Date(b.year, b.month - 1);
    return dateB.getTime() - dateA.getTime();
  });

  const validMonths = sortedMonths.slice(0, 4);

  // Calculate total days in the 4 months
  let totalDays = 0;
  let totalGrossWage = 0;

  for (const month of validMonths) {
    // Get days in month
    const daysInMonth = new Date(month.year, month.month, 0).getDate();
    totalDays += daysInMonth;
    totalGrossWage += month.grossWage;
  }

  // Calculate daily average
  const dailyAverage = totalGrossWage / totalDays;

  // Calculate daily benefit (40% of daily average) - Madde 50
  const dailyBenefit = dailyAverage * 0.4;

  // Calculate monthly benefit (daily * 30)
  const monthlyBenefit = dailyBenefit * 30;

  // Get minimum wage for the reference date
  const minimumWage = getMinimumWageByDate(referenceYear, referenceMonth);

  // Maximum allowed is 80% of minimum wage - Madde 50
  const maxAllowedDaily = minimumWage.monthly * 0.8 / 30;

  // Cap the daily benefit
  const cappedDailyBenefit = Math.min(dailyBenefit, maxAllowedDaily);
  const cappedMonthlyBenefit = cappedDailyBenefit * 30;

  // Determine benefit days based on insured days - Madde 50
  let benefitDays = 0;
  let eligibilityMessage = '';
  let isEligible = true;

  if (totalInsuredDays < 600) {
    benefitDays = 0;
    isEligible = false;
    eligibilityMessage = 'Son 3 yılda 600 günün altında sigortalı. İşsizlik ödeneğine hak kazanmamaktadır.';
  } else if (totalInsuredDays < 900) {
    benefitDays = 180;
    eligibilityMessage = `${totalInsuredDays} gün sigortalı - 180 gün işsizlik ödeneği hakkı`;
  } else if (totalInsuredDays < 1080) {
    benefitDays = 240;
    eligibilityMessage = `${totalInsuredDays} gün sigortalı - 240 gün işsizlik ödeneği hakkı`;
  } else {
    benefitDays = 300;
    eligibilityMessage = `${totalInsuredDays} gün sigortalı - 300 gün işsizlik ödeneği hakkı`;
  }

  const totalBenefitAmount = cappedMonthlyBenefit * (benefitDays / 30);
  
  // Calculate stamp tax deduction (damga vergisi) - %0.759
  const stampTaxRate = 0.00759;
  const stampTaxAmount = totalBenefitAmount * stampTaxRate;
  const netBenefitAmount = totalBenefitAmount - stampTaxAmount;

  return {
    dailyAverage: Math.round(dailyAverage * 100) / 100,
    dailyBenefit: Math.round(dailyBenefit * 100) / 100,
    monthlyBenefit: Math.round(monthlyBenefit * 100) / 100,
    benefitDays,
    maxAllowedDaily: Math.round(maxAllowedDaily * 100) / 100,
    cappedDailyBenefit: Math.round(cappedDailyBenefit * 100) / 100,
    cappedMonthlyBenefit: Math.round(cappedMonthlyBenefit * 100) / 100,
    totalBenefitAmount: Math.round(totalBenefitAmount * 100) / 100,
    stampTaxRate: stampTaxRate * 100,
    stampTaxAmount: Math.round(stampTaxAmount * 100) / 100,
    netBenefitAmount: Math.round(netBenefitAmount * 100) / 100,
    isEligible,
    eligibilityMessage,
  };
}
