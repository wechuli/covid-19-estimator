//import { impact, severeImpact } from './constants';
const { impact, severeImpact, periodTypeConstants } = require('./constants');

// currently infected depending on type - impact or severImpact
function currentlyInfectedCalc(reportedCases, type) {
  if (type === severeImpact) {
    return reportedCases * 50;
  }
  return reportedCases * 10;
}

// project infections given the number of days
function infectionsByRequestedTimeCalc(
  reportedCases,
  type,
  timeToElapse,
  periodType
) {
  const currentlyInfected = currentlyInfectedCalc(reportedCases, type);
  const timeInDays = getNumberOfDays(timeToElapse, periodType);
  const factor = Math.floor(timeInDays / 3);
  const infectionsByRequestedTime = currentlyInfected * Math.pow(2, factor);
  return infectionsByRequestedTime;
}

// severe cases that require hospitalization
function severeCasesByRequestedTimeCalc(infectionsByRequestedTime) {
  const severeCasesByRequestedTime = 0.15 * infectionsByRequestedTime;

  return severeCasesByRequestedTime;
}

// hospital beds available using the requested time
function hospitalBedsByRequestedTimeCalc(
  severeCasesByRequestedTime,
  totalHospitalBeds
) {
  const availableHospitalBeds = 0.35 * totalHospitalBeds;
  const hospitalBedsByRequestedTime =
    availableHospitalBeds - severeCasesByRequestedTime;
  return hospitalBedsByRequestedTime;
}

// cases requiring ICU

function casesForICUByRequestedTimeCalc(infectionsByRequestedTime) {
  const casesForICUByRequestedTime = 0.05 * infectionsByRequestedTime;
  return casesForICUByRequestedTime;
}

// cases requiring ventilators
function casesForVentilatorsByRequestedTimeCalc(infectionsByRequestedTime) {
  const casesForVentilatorsByRequestedTime = 0.02 * infectionsByRequestedTime;
  return casesForVentilatorsByRequestedTime;
}

function getNumberOfDays(timeToElapse, periodType) {
  if (periodType === periodTypeConstants.months) {
    return timeToElapse * 30;
  } else if (periodType == periodTypeConstants.weeks) {
    return timeToElapse * 7;
  } else {
    return timeToElapse;
  }
}

console.log(getNumberOfDays(5, 'days'));
console.log(infectionsByRequestedTimeCalc(1, 'impact', 9, 'days'));
