const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello, Render!');
});

app.get('/action', (req, res) => {
  const rawState = req.headers['x-game-state'];
  if (!rawState) {
    return res.status(400).json({ error: 'Missing X-Game-State header' });
  }

  let gameState;
  try {
    gameState = JSON.parse(rawState);
  } catch (e) {
    return res.status(400).json({ error: 'Invalid JSON in X-Game-State' });
  }

  res.json({ move: 'UP', action: 'COLLECT' });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
