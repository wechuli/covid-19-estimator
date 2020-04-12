const { aggregateResults } = require('../src/aggregators');
const { impact, severeImpact } = require('../src/constants');
const { sampleData1 } = require('./fixtures/samples');
const covid19ImpactEstimator = require('../src/estimator');

test('should correctly return result object', () => {
  const results = {
    data: sampleData1,
    impact: {
      currentlyInfected: 1790,
      infectionsByRequestedTime: 28640,
      severeCasesByRequestedTime: 4296,
      hospitalBedsByRequestedTime: 20204,
      casesForICUByRequestedTime: 1432,
      casesForVentilatorsByRequestedTime: 573,
      dollarsInFlight: 288691.2
    },
    severeImpact: {
      currentlyInfected: 8950,
      infectionsByRequestedTime: 143200,
      severeCasesByRequestedTime: 21480,
      hospitalBedsByRequestedTime: 3020,
      casesForICUByRequestedTime: 7160,
      casesForVentilatorsByRequestedTime: 2864,
      dollarsInFlight: 1443456
    }
  };

  expect(covid19ImpactEstimator(sampleData1)).toEqual(results);
});
