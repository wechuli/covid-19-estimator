const { aggregateResults } = require('./aggregators');
const {impact,severeImpact} = require('./constants');

const sampleData = {
  region: {
    name: 'Africa',
    avgAge: 19.7,
    avgDailyIncomeInUSD: 6,
    avgDailyIncomePopulation: 0.57
  },
  periodType: 'days',
  timeToElapse: 90,
  reportedCases: 4313,
  population: 38999638,
  totalHospitalBeds: 2421066
};


console.log(aggregateResults(sampleData,impact));
console.log(aggregateResults(sampleData,severeImpact));