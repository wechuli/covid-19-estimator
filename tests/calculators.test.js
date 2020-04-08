/* eslint-disable linebreak-style */
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
const {
  periodTypeConstants,
  impact,
  severeImpact
} = require('../src/constants');

test('should convert and return the correct number of days', () => {
  const days = 22;
  const weeks = 3;
  const months = 2;
  expect(getNumberOfDays(days, periodTypeConstants.days)).toBe(22);
  expect(getNumberOfDays(weeks, periodTypeConstants.weeks)).toBe(21);
  expect(getNumberOfDays(months, periodTypeConstants.months)).toBe(60);
});

test('should correctly estimate the number of those infected', () => {
  const reportedCases = 10;
  const population = 1000000;

  expect(currentlyInfectedCalc(reportedCases, impact, population)).toBe(
    reportedCases * 10
  );
  expect(currentlyInfectedCalc(reportedCases, severeImpact, population)).toBe(
    reportedCases * 50
  );
});

test('should return the population if those infected is greater than the population', () => {
  const reportedCases = 100001;
  const population = 1000000;
  expect(currentlyInfectedCalc(reportedCases, impact, population)).toBe(
    population
  );
  expect(currentlyInfectedCalc(reportedCases, impact, population)).toBe(
    population
  );
});

test('should return the number of infected by the given time', () => {
    const currentlyInfected = 10000;
    const noOfDays = 10;
    const population = 1000000;

});
