const express = require('express');
const cors = require('cors');
console.log('🔵 Server is starting...');

const app = express();
app.use(cors({
  origin: '*',
  methods: ['GET'],
  allowedHeaders: ['Content-Type', 'X-Game-State']
}));
app.use(express.json());




app.get('/', (req, res) => {
  res.send('Hello, Express!');
});

app.get('/action', (req, res) => {
  console.log('🟡 /action called');
  const rawState = req.headers['x-game-state'];
  console.log('📦 Received X-Game-State:', rawState);

  if (!rawState) {
    return res.status(400).json({ error: 'Missing X-Game-State header' });
  }

  try {
    const gameState = JSON.parse(rawState);
    console.log('✅ Parsed game state:', gameState);

    return res.json({ move: 'UP', action: 'ATTACK' });
  } catch (err) {
    console.error('❌ JSON parsing failed:', err.message);
    return res.status(400).json({ error: 'Invalid JSON in X-Game-State' });
  }
});


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});