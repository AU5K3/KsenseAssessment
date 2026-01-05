const { bpScore, tempScore, ageScore, hasDataIssue } = require('./riskScoring');

function processPatients(patients) {
  const highRisk = [];
  const fever = [];
  const dataIssues = [];

  for (const p of patients) {
    if (hasDataIssue(p)) {
      dataIssues.push(p.patient_id);
      continue; // skip scoring for invalid data
    }

    const total = bpScore(p.blood_pressure) + tempScore(p.temperature) + ageScore(p.age);

    if (total >= 4) highRisk.push(p.patient_id);
    if (Number(p.temperature) >= 99.6) fever.push(p.patient_id);
  }

  return {
    high_risk_patients: highRisk,
    fever_patients: fever,
    data_quality_issues: dataIssues
  };
}

module.exports = { processPatients };
