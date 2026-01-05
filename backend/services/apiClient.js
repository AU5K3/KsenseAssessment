const axios = require('axios');
const retry = require('../utils/retry');
const { BASE_URL, API_KEY, PAGE_LIMIT } = require('../config');

const client = axios.create({
  baseURL: BASE_URL,
  headers: { 'x-api-key': API_KEY }
});

async function fetchAllPatients() {
  let page = 1;
  let patients = [];
  let hasNext = true;

  while (hasNext) {
    const response = await retry(() =>
      client.get(`/patients?page=${page}&limit=${PAGE_LIMIT}`)
    );

    if (!response || !response.data) {
      throw new Error(`Invalid API response on page ${page}: ${JSON.stringify(response)}`);
    }

    // Support both 'data' and 'patients' keys
    const pagePatients = response.data.data || response.data.patients;
    if (!Array.isArray(pagePatients)) {
      throw new Error(`Patients array missing on page ${page}: ${JSON.stringify(response.data)}`);
    }

    patients.push(...pagePatients);

    // Determine if next page exists
    if (response.data.pagination) {
      hasNext = response.data.pagination.hasNext;
    } else {
      // fallback: use current_page / total_records / per_page
      const { current_page, per_page, total_records } = response.data;
      hasNext = current_page * per_page < total_records;
    }

    console.log(`Fetched page ${page}, total patients so far: ${patients.length}`);
    page++;
  }

  return patients;
}

module.exports = { fetchAllPatients };
