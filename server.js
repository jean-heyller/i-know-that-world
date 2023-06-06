const express = require('express');
const fs = require('fs');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.post('/escribirArchivo', (req, res) => {
  const palabra = req.body.palabra + '\n';
  const archivoUsuarios = path.join(__dirname, 'public', 'usuarios.txt');

  fs.appendFile(archivoUsuarios, palabra, (err) => {
    if (err) {
      console.log('Error al escribir en el archivo:', err);
      res.sendStatus(500);
    } else {
      res.sendStatus(200);
    }
  });
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
