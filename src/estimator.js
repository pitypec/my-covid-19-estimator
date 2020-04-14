const covid19ImpactEstimator = (data) => {
  const impact = {};
  const severeImpact = {};
  const beds = 0.35 * data.totalHospitalBeds;
  const populations = data.region.avgDailyIncomePopulation;
  const dailyIncome = data.region.avgDailyIncomeInUSD;

  // Normalizing PeriodType To Days
  if (data.periodType === 'days') {
    data.timeToElapse *= 1;
  } else if (data.periodType === 'weeks') {
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
  const impactInfeected = impact.currentlyInfected;
  impact.infectionsByRequestedTime = 2 ** factor * impactInfeected;
  const severeImpactInfected = severeImpact.currentlyInfected;
  severeImpact.infectionsByRequestedTime = 2 ** factor * severeImpactInfected;

  // chhallenge two
  // Severe Cases By Requested Time
  const impactSevereCases = impact.infectionsByRequestedTime;
  const severeImpactCases = severeImpact.infectionsByRequestedTime;
  impact.severeCasesByRequestedTime = 0.15 * impactSevereCases;
  severeImpact.severeCasesByRequestedTime = 0.15 * severeImpactCases;

  // Hospital Beds By Requested Time
  const impactSeve = impact.severeCasesByRequestedTime;
  const severeCases = severeImpact.severeCasesByRequestedTime;
  impact.hospitalBedsByRequestedTime = Math.trunc(beds - impactSeve);
  severeImpact.hospitalBedsByRequestedTime = Math.trunc(beds - severeCases);

  // challenge three
  // Cases For ICU By Requested Time
  const impactcasesForICU = impact.infectionsByRequestedTime;
  impact.casesForICUByRequestedTime = 0.05 * impactcasesForICU;
  const severeCasesForICU = severeImpact.infectionsByRequestedTime;
  severeImpact.casesForICUByRequestedTime = 0.05 * severeCasesForICU;

  // Cases For Ventilators By Requested Time
  const impactCasesForVentilators = Math.trunc(
    0.02 * impact.infectionsByRequestedTime
  );
  impact.casesForVentilatorsByRequestedTime = impactCasesForVentilators;
  const severeCasesForVentilators = Math.trunc(
    0.02 * severeImpact.infectionsByRequestedTime
  );
  severeImpact.casesForVentilatorsByRequestedTime = severeCasesForVentilators;

  // Dollars In Flight
  const impactDollars = impact.infectionsByRequestedTime;
  const dollar = (impactDollars * populations * dailyIncome) / date;
  impact.dollarsInFlight = Math.trunc(dollar);

  const severeInfections = severeImpact.infectionsByRequestedTime;
  const severeDollars = (severeInfections * populations * dailyIncome) / date;
  severeImpact.dollarsInFlight = Math.trunc(severeDollars);

  return {
    data: {},
    impact,
    severeImpact
  };
};

export default covid19ImpactEstimator;
