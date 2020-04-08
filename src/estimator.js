const { impact, severeImpact } = require('./constants');
const { aggregateResults } = require('./aggregators');

const rawData = {
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
const covid19ImpactEstimator = (data) => {
  return {
    data,
    impact: aggregateResults(data, impact),
    severeImpact: aggregateResults(data, severeImpact)
  };
};

console.log(covid19ImpactEstimator(rawData));

//export default covid19ImpactEstimator;
