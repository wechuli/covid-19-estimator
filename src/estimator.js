const covid19ImpactEstimator = (data) => {
  const {
    region,
    periodType,
    timeToElapse,
    reportedCases,
    population,
    totalHospitalBeds
  } = data;
  return {
    data,
    impact: {},
    severeImpact: {}
  };
};

export default covid19ImpactEstimator;
