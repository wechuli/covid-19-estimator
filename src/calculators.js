//import { impact, severeImpact } from './constants';
const { impact, severeImpact, periodTypeConstants } = require('./constants');

// currently infected depending on type - impact or severImpact
function currentlyInfectedCalc(reportedCases, type, population) {
  if (type === severeImpact) {
    return Math.min(reportedCases * 50, population);
  }
  return Math.min(reportedCases * 10, population);
}

// project infections given the number of days
function infectionsByRequestedTimeCalc(
  currentlyInfected,
  noOfDays,
  population
) {
  const factor = Math.floor(noOfDays / 3);
  const infectionsByRequestedTime = Math.min(
    currentlyInfected * Math.pow(2, factor),
    population
  );
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

// dollars in flight
function dollarsInFlightCalc(infectionsByRequestedTime, region, noOfDays) {
  const { avgDailyIncomeInUSD, avgDailyIncomePopulation } = region;
  const dollarsInFlight =
    infectionsByRequestedTime *
    avgDailyIncomeInUSD *
    avgDailyIncomePopulation *
    noOfDays;
  return dollarsInFlight;
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

module.exports = {
  getNumberOfDays,
  dollarsInFlightCalc,
  casesForVentilatorsByRequestedTimeCalc,
  casesForICUByRequestedTimeCalc,
  hospitalBedsByRequestedTimeCalc,
  severeCasesByRequestedTimeCalc,
  infectionsByRequestedTimeCalc,
  currentlyInfectedCalc
};
