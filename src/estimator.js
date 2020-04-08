// export const challengeOne = () => {
//   const data = {
//     region: {
//       name: 'Africa',
//       avgAge: 19.7,
//       avgDailyIncomeInUSD: 5,
//       avgDailyIncomePopulation: 0.71
//     },
//     periodType: 'days',
//     timeToElapse: 58,
//     reportedCases: 674,
//     population: 66622705,
//     totalHospitalBeds: 1380614
//   };
//   const impact = {};
//   const severeImpact = {};

//   //  const currentlyInfected = 0;

//   impact.currentlyInfected = data.reportedCases * 10;
//   severeImpact.currentlyInfected = data.reportedCases * 50;

//   impact.infectionsRequestedByTime = impact.currentlyInfected * 2 ** 9;
//   severeImpact.infectionsRequestedByTime =
//     severeImpact.currentlyInfected * 2 ** 9;

//   impact.severeCasesByrequestedTime =
//     (15 / 100) * impact.infectionsRequestedByTime;
//   severeImpact.severeCasesByrequestedTime =
//     (15 / 100) * severeImpact.infectionsRequestedByTime;

//   return { data, impact, severeImpact };
// };
const covid19ImpactEstimator = (data) => {
  const impact = {};
  const severeImpact = {};

  //  const currentlyInfected = 0;

  impact.currentlyInfected = data.reportedCases * 10;
  severeImpact.currentlyInfected = data.reportedCases * 50;

  impact.infectionsRequestedByTime = impact.currentlyInfected * 2 ** 9;
  severeImpact.infectionsRequestedByTime =
    severeImpact.currentlyInfected * 2 ** 9;

  impact.severeCasesByrequestedTime =
    (15 / 100) * impact.infectionsRequestedByTime;
  severeImpact.severeCasesByrequestedTime =
    (15 / 100) * severeImpact.infectionsRequestedByTime;

  return {
    data,
    impact,
    severeImpact
  };
};

export default covid19ImpactEstimator;
