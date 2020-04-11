const covid19ImpactEstimator = (data) => {
  const impact = {};
  const severeImpact = {};
  const beds = (35 / 100) * data.totalHospitalBeds;
  const populations = data.region.avgDailyIncomePopulation;

  // Normalizing PeriodType To Days
  if (data.periodType === 'weeks') {
    data.timeToElapse *= 7;
  } else if (data.periodType === 'month') {
    data.timeToElapse *= 30;
  }

  const date = data.timeToElapse;
  const factor = Math.trunc(date / 3);

  //challenge one

  // currently Infected
  impact.currentlyInfected = data.reportedCases * 10;
  severeImpact.currentlyInfected = data.reportedCases * 50;

  // Infection By Requested Time
  impact.infectionsByRequestedTime = impact.currentlyInfected * 2 ** factor;
  severeImpact.infectionsByRequestedTime =
    severeImpact.currentlyInfected * 2 ** factor;

  //chhallenge two

  // Severe Cases By Requested Time
  impact.severeCasesByrequestedTime =
    (15 / 100) * impact.infectionsByRequestedTime;
  severeImpact.severeCasesByrequestedTime =
    (15 / 100) * severeImpact.infectionsByRequestedTime;

  // Hospital Beds By Requested Time
  impact.hospitalBedsByRequestedTime = Math.trunc(
    beds - impact.severeCasesByrequestedTime
  );
  severeImpact.hospitalBedsByRequestedTime = Math.trunc(
    beds - severeImpact.severeCasesByrequestedTime
  );

  //challenge three

  //Cases For ICU By Requested Time
  impact.casesForICUByRequestedTime =
    (5 / 100) * impact.infectionsByRequestedTime;
  severeImpact.casesForICUByRequestedTime =
    (5 / 100) * severeImpact.infectionsByRequestedTime;

  // Cases For Ventilators By Requested Time
  impact.casesForVentilatorsByRequestedTime = Math.round(
    (2 / 100) * impact.infectionsByRequestedTime
  );
  severeImpact.casesForVentilatorsByRequestedTime = Math.round(
    (2 / 100) * severeImpact.infectionsByRequestedTime
  );

  // Dollars In Flight

  const impactDollarsInFlight =
    impact.infectionsByRequestedTime *
    populations *
    data.region.avgDailyIncomeInUSD *
    date;
  impact.dollarsInFlight = impactDollarsInFlight.toFixed(1);

  const severeDollarsInFlight =
    severeImpact.infectionsByRequestedTime *
    populations *
    data.region.avgDailyIncomeInUSD *
    date;
  severeImpact.dollarsInFlight = severeDollarsInFlight;

  return {
    data,
    impact,
    severeImpact
  };
};

export default covid19ImpactEstimator;
