const express = require('express');
const cors = require('cors');

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
  const gameState = req.body;
    console.log('X-Game-State:', req.headers['x-game-state']);

  const response = {
    move: "UP",
    action: "COLLECT"
  };

  res.json(response);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});