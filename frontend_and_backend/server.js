const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// ============================================================
//  STUB — replace with your real model / neural network API
// ============================================================
function mockNeuralNetwork(name, specialization, hours) {
  // Simple heuristic for demo purposes.
  // Connect your trained model here (Python subprocess / ONNX / external API).
  const h = parseFloat(hours) || 0;
  let score = 1;

  if (h >= 40 && h <= 60) score += 1.5;
  else if (h > 60 && h <= 80) score += 1;
  else if (h > 80) score += 0.5;

  if (specialization.length > 3) score += 1;
  if (name.length > 3) score += 0.5;

  score = Math.min(5, Math.max(1, Math.round(score)));

  const comments = {
    1: `"${name}" needs serious improvement. The "${specialization}" niche is interesting, but ${h} working hours per week is far too little for stable growth. We recommend rethinking the operational model.`,
    2: `"${name}" has potential, but performance is below average. ${h} hours per week in the "${specialization}" niche is just a starting point. Consider increasing reach and optimising key processes.`,
    3: `"${name}" shows average results. A "${specialization}" business with ${h} working hours per week has a solid foundation. Growth requires investment in marketing and team expansion.`,
    4: `"${name}" is performing well! The "${specialization}" niche is in demand, and ${h} hours per week shows a serious commitment. Keep going and scale up.`,
    5: `"${name}" is an excellent business! The "${specialization}" specialisation is a smart choice, and ${h} hours per week demonstrates high dedication. This business has every chance of becoming a market leader.`,
  };

  return { score, comment: comments[score] };
}
// ============================================================

app.post('/api/analyze', (req, res) => {
  const { name, specialization, hours } = req.body;

  // Validation
  if (!name || !specialization || hours === undefined) {
    return res.status(400).json({ error: 'Please fill in all fields.' });
  }
  const h = parseFloat(hours);
  if (isNaN(h) || h < 0 || h > 168) {
    return res.status(400).json({ error: 'Working hours must be a number from 0 to 168.' });
  }

  // Simulated model delay
  setTimeout(() => {
    const result = mockNeuralNetwork(name, specialization, h);
    res.json(result);
  }, 1200);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Backend running at http://localhost:${PORT}`));
