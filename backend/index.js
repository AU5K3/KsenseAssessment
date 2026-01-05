const express = require('express');
const { fetchAllPatients } = require('./services/apiClient');
const { processPatients } = require('./services/processor');
const axios = require('axios');
const { API_KEY } = require('./config');

const app = express();
app.use(express.json());
const PORT = 3001;

app.get('/run-assessment', async (req, res) => {
  try {
    const patients = await fetchAllPatients();
    const result = processPatients(patients);

    // Submit results
    const submission = await axios.post(
      'https://assessment.ksensetech.com/api/submit-assessment',
      result,
      { headers: { 'x-api-key': API_KEY } }
    );

    res.json(submission.data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
