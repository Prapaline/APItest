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
    const rawGameState = req.headers['x-game-state'];

    if (!rawGameState) {
        return res.status(400).json({ error: 'X-Game-State header manquant' });
    }

    let gameState;
    try {
        gameState = JSON.parse(rawGameState);
    } catch (e) {
        return res.status(400).json({ error: 'GameState invalide (JSON)' });
    }

    console.log('📦 Reçu GameState :', gameState);

    res.json({
        move: 'STAY',
        action: 'NONE'
    });
});



const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});