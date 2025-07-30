const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Bot API is running!');
});

app.get('/action', (req, res) => {
  const gameStateRaw = req.headers['x-game-state'];

  if (!gameStateRaw) {
    return res.status(400).json({ error: 'Missing game state' });
  }

  let gameState;
  try {
    gameState = JSON.parse(gameStateRaw);
  } catch (error) {
    return res.status(400).json({ error: 'Invalid JSON in X-Game-State' });
  }

  const { you, points, megaPoint } = gameState;

  const botX = you.x;
  const botY = you.y;

  const allTargets = [...points, megaPoint];
  let closest = null;
  let minDist = Infinity;
  for (const target of allTargets) {
    const dist = Math.abs(botX - target.x) + Math.abs(botY - target.y);
    if (dist < minDist) {
      minDist = dist;
      closest = target;
    }
  }

  let move = 'STAY';
  if (closest) {
    if (closest.x < botX) move = 'LEFT';
    else if (closest.x > botX) move = 'RIGHT';
    else if (closest.y < botY) move = 'UP';
    else if (closest.y > botY) move = 'DOWN';
    else move = 'STAY';
  }

  let action = 'NONE';
  if (closest && closest.x === botX && closest.y === botY) {
    action = 'COLLECT';
  }

  res.json({ move, action });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Bot server listening on port ${port}`);
});
