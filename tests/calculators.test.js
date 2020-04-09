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
  const noOfDays = 6;
  const population = 1000000;

  const infectionsByRequestedTime =
    currentlyInfected * Math.pow(2, Math.floor(noOfDays / 3));

  expect(
    infectionsByRequestedTimeCalc(currentlyInfected, noOfDays, population)
  ).toBe(infectionsByRequestedTime);
});

test('should return the total population if the infections by requested time exceed the population', () => {
  const currentlyInfected = 100000;
  const noOfDays = 28;
  const population = 1000000;

  //   const infectionsByRequestedTime =
  //     currentlyInfected * Math.pow(2, Math.floor(noOfDays / 3));

  expect(
    infectionsByRequestedTimeCalc(currentlyInfected, noOfDays, population)
  ).toBe(population);
});

test('should return correct number of severe positive cases', () => {
  const infectionsByRequestedTime = 1000000;
  const severeCasesByRequestedTime = 0.15 * infectionsByRequestedTime;

  expect(severeCasesByRequestedTimeCalc(infectionsByRequestedTime)).toBe(
    severeCasesByRequestedTime
  );
});

test('should return the correct number of cases that would require ICU', () => {
  const infectionsByRequestedTime = 1000000;
  const casesForICUByRequestedTime = 0.05 * infectionsByRequestedTime;

  expect(casesForICUByRequestedTimeCalc(infectionsByRequestedTime)).toBe(
    casesForICUByRequestedTime
  );
});

test('should return the correct number of cases that would require a ventilator', () => {
  const infectionsByRequestedTime = 1000000;
  const casesForVentilatorsByRequestedTime = 0.02 * infectionsByRequestedTime;

  expect(
    casesForVentilatorsByRequestedTimeCalc(infectionsByRequestedTime)
  ).toBe(casesForVentilatorsByRequestedTime);
});

test('should determine how many beds are available for severe cases', () => {
  const totalHospitalBeds = 1000;
  const severeCasesByRequestedTime = 1000;
  const availableHospitalBeds = 0.35 * totalHospitalBeds;

  expect(
    hospitalBedsByRequestedTimeCalc(
      severeCasesByRequestedTime,
      totalHospitalBeds
    )
  ).toBe(availableHospitalBeds - severeCasesByRequestedTime);
});

test('should correctly calculate the total dollars in flight', () => {
  const infectionsByRequestedTime = 10000;
  const avgDailyIncomeInUSD = 5;
  const avgDailyIncomePopulation = 0.65;

  const region = {
    name: 'Africa',
    avgDailyIncomeInUSD,
    avgDailyIncomePopulation
  };
  const noOfDays = 30;
  const dollarsInFlight =
    infectionsByRequestedTime *
    avgDailyIncomeInUSD *
    avgDailyIncomePopulation *
    noOfDays;

  expect(dollarsInFlightCalc(infectionsByRequestedTime, region, noOfDays)).toBe(
    dollarsInFlight
  );
});
