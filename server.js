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

app.post('/actualizarArchivo', (req, res) => {
  const nombre = req.body.nombre;
  const nuevoNumero = req.body.numero;
  const archivoUsuarios = path.join(__dirname, 'public', 'usuarios.txt');

  fs.readFile(archivoUsuarios, 'utf8', (err, data) => {
    if (err) {
      console.log('Error al leer el archivo:', err);
      res.sendStatus(500);
    } else {
      const lineas = data.split('\n');
      for (let i = 0; i < lineas.length; i++) {
        if (lineas[i].startsWith(`${nombre}:`)) {
          const partes = lineas[i].split(':');
          lineas[i] = `${partes[0]}:${nuevoNumero}`;
          break;
        }
      }
      const nuevoContenido = lineas.join('\n');
      fs.writeFile(archivoUsuarios, nuevoContenido, (err) => {
        if (err) {
          console.log('Error al escribir en el archivo:', err);
          res.sendStatus(500);
        } else {
          res.sendStatus(200);
        }
      });
    }
  });
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
