function bpScore(bp) {
  if (!bp || typeof bp !== 'string' || !bp.includes('/')) return 0;
  const [s, d] = bp.split('/').map(Number);
  if (isNaN(s) || isNaN(d)) return 0;

  if (s >= 140 || d >= 90) return 3;
  if (s >= 130 || d >= 80) return 2;
  if (s >= 120 && d < 80) return 1;
  if (s < 120 && d < 80) return 0;
  return 0;
}

function tempScore(t) {
  const temp = Number(t);
  if (isNaN(temp)) return 0;
  if (temp >= 101) return 2;
  if (temp >= 99.6) return 1;
  return 0;
}

function ageScore(a) {
  const age = Number(a);
  if (isNaN(age)) return 0;
  if (age > 65) return 2;
  if (age >= 40 && age <= 65) return 1;
  return 0;
}

function hasDataIssue(p) {
  // Validate BP
  if (!p.blood_pressure || typeof p.blood_pressure !== 'string') return true;
  if (!p.blood_pressure.includes('/')) return true;
  const [s, d] = p.blood_pressure.split('/').map(Number);
  if (isNaN(s) || isNaN(d)) return true;

  // Validate temperature
  if (p.temperature === null || p.temperature === undefined) return true;
  const tempNum = Number(p.temperature);
  if (isNaN(tempNum)) return true;

  // Validate age
  if (p.age === null || p.age === undefined) return true;
  const ageNum = Number(p.age);
  if (isNaN(ageNum)) return true;

  return false;
}

module.exports = { bpScore, tempScore, ageScore, hasDataIssue };
