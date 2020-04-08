import { impact, severeImpact } from './constants';

export function currentlyInfectedCalc(reportedCases, type) {
  if (type === severeImpact) {
    return reportedCases * 50;
  }
  return reportedCases * 10;
}
