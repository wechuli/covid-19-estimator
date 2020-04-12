const { aggregateResults } = require('../src/aggregators');
const { impact, severeImpact } = require('../src/constants');
const { sampleData1 } = require('./fixtures/samples');

test('should calculate the best case impact using the sample data', () => {
  const expectedResults = {
    currentlyInfected: 1790,
    infectionsByRequestedTime: 28640,
    severeCasesByRequestedTime: 4296,
    hospitalBedsByRequestedTime: 20204,
    casesForICUByRequestedTime: 1432,
    casesForVentilatorsByRequestedTime: 573,
    dollarsInFlight: 288691.2
  };

  expect(aggregateResults(sampleData1, impact)).toEqual(expectedResults);
});

test('should correctly calculate the worst case impact', () => {
  const expectedResults = {
    currentlyInfected: 8950,
    infectionsByRequestedTime: 143200,
    severeCasesByRequestedTime: 21480,
    hospitalBedsByRequestedTime: 3020,
    casesForICUByRequestedTime: 7160,
    casesForVentilatorsByRequestedTime: 2864,
    dollarsInFlight: 1443456
  };

  expect(aggregateResults(sampleData1, severeImpact)).toEqual(expectedResults);
});
