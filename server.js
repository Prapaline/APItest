const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());




app.get('/', (req, res) => {
  res.send('Hello, Express!');
});

app.get('/action', (req, res) => {
  const gameState = req.body;
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