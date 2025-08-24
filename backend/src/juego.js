const express = require('express');
const router = express.Router();

let jugadores = [];
let intentos1 = [];
let intentos2 = [];
let rondas = 0;
let randomNumber = 0;
let turno = 0;
let juegos = 0;

// POST para iniciar el juego
router.post('/jugando', (req, res) => {
  const { jugador1, jugador2 } = req.body;
  jugadores = [jugador1, jugador2];
  intentos1 = [];
  intentos2 = [];
  rondas = 0;
  randomNumber = 0;
  turno = 0;
  juegos = 0;
  res.json({ message: 'Juego iniciado', jugadores });
});

// GET para cambiar orden de jugadores aleatoriamente
router.get('/jugando', (req, res) => {
  let cambio = Math.floor(Math.random() * 2); // 0 o 1
  if (cambio === 1) {
    let temp = jugadores[0];
    jugadores[0] = jugadores[1];
    jugadores[1] = temp;
  }
  res.json({ jugadores });
});

// GET para generar número aleatorio
router.post('/numero', (req, res) => {
  randomNumber = Math.floor(Math.random() * 100) + 1;
});


router.get('/Fin', (req, res) => {
  console.log(juegos);
  if (juegos === 6){
    return res.json({ valido: true });
  } else {
    return res.json({ valido: false });
  }
});


// GET para validar número
router.get('/Validar', (req, res) => {
  const { numero } = req.query;
  if (parseInt(numero) === randomNumber) {
    if (turno === 0) {
      intentos1.push(rondas + 1);
      turno = 1; 
    } else {
      intentos2.push(rondas + 1);
      turno = 0; 
    }
    juegos++;
    rondas = 0;
    randomNumber = Math.floor(Math.random() * 100) + 1;
    return res.json({ valido: true });
  } else {
    rondas++;
    return res.json({ valido: false });
  }
});

router.get('/ganador', (req,res)=>{
  let intento1n = intentos1[0]+intentos1[1]+intentos1[2];
  let intento2n = intentos2[0]+intentos2[1]+intentos2[2];
  const fs = require('fs');const path = require('path');
  const archivoJSON = path.join(__dirname, 'historial.json');
  let partidas = [];
  const datos = fs.readFileSync(archivoJSON, 'utf-8');
  partidas = JSON.parse(datos).partidas || [];
  
  if (intento1n < intento2n){
    const partida = {
      ganador: jugadores[0],
      perdedor:jugadores[1],
      intentosGanador: intentos1,
      intentosPerdedor:intentos2
    };
    partidas.push(partida);
    fs.writeFileSync(archivoJSON, JSON.stringify({ partidas }, null, 2));
    res.json({ 
      Ganador : jugadores[0],
      perdedor: jugadores[1],
      ganadorintentos: intentos1,
      perdedorintentos2: intentos2
    });
  }
  else {
      const partida = {
      ganador: jugadores[1],
      perdedor:jugadores[0],
      intentosGanador: intentos2,
      intentosPerdedor:intentos1
    };
    partidas.push(partida);
    fs.writeFileSync(archivoJSON, JSON.stringify({ partidas }, null, 2));
    
    res.json({ 
      Ganador : jugadores[1],
      perdedor: jugadores[0],
      ganadorintentos: intentos2,
      perdedorintentos2: intentos1
    });
  }
});


router.get('/rondas', (req, res) => {
  res.json({ rondas });
});
router.get('/turno', (req, res) => {
  console.log(turno)
  res.json({ turno });


});

router.get('/cercania', (req, res) => {
    const { numero } = req.query;
    console.log(numero, randomNumber);
    if (numero < randomNumber) {
        return res.json({ mensaje: 'El número es mayor' });
    } else { 
        return res.json({ mensaje: 'El número es menor' });
    }
});

module.exports = router;
