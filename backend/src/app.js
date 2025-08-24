const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const jugandoruta = require('./jugando');

app.use('/api/jugando', jugandoruta);


app.listen(3000, () => {
  console.log('Servidor backend corriendo en http://localhost:3000');
});




