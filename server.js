const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.get('/action', (req, res) => {
  const gameStateRaw = req.headers['x-game-state'];

  if (!gameStateRaw) {
    return res.status(400).json({ error: 'Missing game state' });
  }

  let gameState;
  try {
    gameState = JSON.parse(gameStateRaw);
  } catch (e) {
    return res.status(400).json({ error: 'Invalid JSON in X-Game-State' });
  }

  res.json({ move: 'STAY', action: 'NONE' });
});
