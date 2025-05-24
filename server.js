const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;

// Ajuste o nome conforme a pasta gerada pelo ng build
const DIST_FOLDER = path.join(__dirname, 'dist/demo');

app.use(express.static(DIST_FOLDER));

app.get('*', (req, res) => {
  res.sendFile(path.join(DIST_FOLDER, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
