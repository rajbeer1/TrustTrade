

import { Funds, User } from '@prisma/client';

interface BusinessMetrics {
  sumAssured: number;
  safetyRating: number;
}

export const  calculateBusinessMetrics=(
  user: User,
  funds: Funds[]
): BusinessMetrics=> {
  const currentDate = new Date();
  const registrationDate = user.registeredAt;
  const businessAge =
    (currentDate.getTime() - registrationDate.getTime()) /
    (1000 * 60 * 60 * 24 * 365); // in years

  // Calculate base sum assured
  let sumAssured = funds.reduce((sum, fund) => sum + fund.income, 0);

  // Adjust sum assured based on business age
  if (businessAge < 0.3) {
    sumAssured *= 0.8; // 20% reduction for businesses less than a year old
  } else if (businessAge < 1.5) {
    sumAssured *= 0.9; // 10% reduction for businesses 1-3 years old
  } else if (businessAge > 2) {
    sumAssured *= 1.1; // 10% increase for businesses more than 5 years old
  }

  // Calculate safety rating
  let safetyPoints = 3; // Start with a neutral rating

  // Adjust based on income vs loss ratio
  const totalIncome = funds.reduce((sum, fund) => sum + fund.income, 0);
  const totalLoss = funds.reduce((sum, fund) => sum + fund.loss, 0);
  const incomeToLossRatio = totalIncome / (totalLoss || 1);

  if (incomeToLossRatio > 2) safetyPoints++;
  if (incomeToLossRatio > 4) safetyPoints++;
  if (incomeToLossRatio < 1) safetyPoints--;
  if (incomeToLossRatio < 0.5) safetyPoints--;

  // Adjust based on tax compliance
  const totalTaxPaid = funds.reduce((sum, fund) => sum + fund.taxPaid, 0);
  const totalTaxPayable = funds.reduce((sum, fund) => sum + fund.taxPayable, 0);
  const taxComplianceRatio = totalTaxPaid / (totalTaxPayable || 1);

  if (taxComplianceRatio > 0.9) safetyPoints++;
  if (taxComplianceRatio < 0.7) safetyPoints--;

  // Ensure safety rating is between 1 and 5
  const safetyRating = Math.max(1, Math.min(5, safetyPoints));

  return { sumAssured, safetyRating };
}
