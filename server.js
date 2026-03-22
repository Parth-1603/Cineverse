const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// API Endpoint returning JSON data
app.get('/api/system-status', (req, res) => {
  res.json({
    status: 'ONLINE',
    message: 'Welcome to the Cineverse backend server.',
    timestamp: new Date().toISOString(),
    supportedTech: ['Node.js', 'Express', 'JSON', 'React', 'ES6']
  });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Cineverse backend server running on port ${PORT}`);
});
