const covid19ImpactEstimator = (data) => {
  const impact = {};
  const severeImpact = {};
  const beds = 0.35 * data.totalHospitalBeds;
  const populations = data.region.avgDailyIncomePopulation;
  const dailyIncome = data.region.avgDailyIncomeInUSD;
  const severeInfections = severeImpact.infectionsByRequestedTime;

  // Normalizing PeriodType To Days
  if (data.periodType === 'weeks') {
    data.timeToElapse *= 7;
  } else if (data.periodType === 'months') {
    data.timeToElapse *= 30;
  }

  const date = data.timeToElapse;
  const factor = Math.trunc(date / 3);

  // challenge one
  // currently Infected
  impact.currentlyInfected = data.reportedCases * 10;
  severeImpact.currentlyInfected = data.reportedCases * 50;

  // Infection By Requested Time
  impact.infectionsByRequestedTime = impact.currentlyInfected * 2 ** factor;
  const severeImpactInfected = severeImpact.currentlyInfected * 2 ** factor;
  severeImpact.infectionsByRequestedTime = severeImpactInfected;

  // chhallenge two
  // Severe Cases By Requested Time
  const impactSevereCases = 0.15 * impact.infectionsByRequestedTime;
  impact.severeCasesByrequestedTime = impactSevereCases;
  const severeImpactCases = 0.15 * severeImpact.infectionsByRequestedTime;
  severeImpact.severeCasesByrequestedTime = severeImpactCases;

  // Hospital Beds By Requested Time
  const severeCases = severeImpact.severeCasesByrequestedTime;
  impact.hospitalBedsByRequestedTime = Math.ceil(
    beds - impact.severeCasesByrequestedTime
  );
  severeImpact.hospitalBedsByRequestedTime = Math.ceil(beds - severeCases);

  // challenge three
  // Cases For ICU By Requested Time
  const impactcasesForICU = (5 / 100) * impact.infectionsByRequestedTime;
  impact.casesForICUByRequestedTime = impactcasesForICU;
  const severeCasesForICU = (5 / 100) * severeImpact.infectionsByRequestedTime;
  severeImpact.casesForICUByRequestedTime = severeCasesForICU;

  // Cases For Ventilators By Requested Time
  const impactCasesForVentilators = Math.round(
    (2 / 100) * impact.infectionsByRequestedTime
  );
  impact.casesForVentilatorsByRequestedTime = impactCasesForVentilators;
  const severeCasesForVentilators = Math.round(
    (2 / 100) * severeImpact.infectionsByRequestedTime
  );
  severeImpact.casesForVentilatorsByRequestedTime = severeCasesForVentilators;

  // Dollars In Flight
  const b = impact.infectionsByRequestedTime * populations * dailyIncome * date;
  const impactDollarsInFlight = b;
  impact.dollarsInFlight = impactDollarsInFlight.toFixed(1);

  const severeDollars = severeInfections * populations * dailyIncome * date;
  severeImpact.dollarsInFlight = severeDollars;

  return {
    data,
    impact,
    severeImpact
  };
};

export default covid19ImpactEstimator;
