const express = require('express');
const app = express();




app.get('/', (req, res) => {
  res.send('Hello, Express!');
});

app.post('/action', (req, res) => {
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