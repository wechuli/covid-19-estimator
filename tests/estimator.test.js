const {
  getNumberOfDays,
  dollarsInFlightCalc,
  casesForVentilatorsByRequestedTimeCalc,
  casesForICUByRequestedTimeCalc,
  hospitalBedsByRequestedTimeCalc,
  severeCasesByRequestedTimeCalc,
  infectionsByRequestedTimeCalc,
  currentlyInfectedCalc
} = require('../src/calculators');

const sample1 = {
  region: {
    name: 'Africa',
    avgAge: 19.7,
    avgDailyIncomeInUSD: 5,
    avgDailyIncomePopulation: 0.71
  },
  periodType: 'days',
  timeToElapse: 8,
  reportedCases: 674,
  population: 66622705,
  totalHospitalBeds: 1380614
};

const sample2 = {
  region: {
    name: 'Kenya',
    avgAge: 19,
    avgDailyIncomeInUSD: 5,
    avgDailyIncomePopulation: 0.65
  },
  periodType: 'weeks',
  timeToElapse: 3,
  reportedCases: 674,
  population: 66622705,
  totalHospitalBeds: 1380614
}

test('should ', () => {});
