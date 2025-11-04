const express = require('express');
const app = express();

PORT = 3001;
const { PORT = 3001 } = process.env;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});