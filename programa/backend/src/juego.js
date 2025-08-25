const express = require('express');
const router = express.Router();
// Variables globales para el estado del juego

let jugadores = [];
let intentos1 = [];
let intentos2 = [];
let rondas = 0;
let randomNumber = 0;
let turno = 0;
let juegos = 0;
let tiempo1 = 0;
let tiempo2 = 0;
let intervalo1 = null;
let intervalo2 = null;




// Funciones para manejar el tiempo del jugador1
// Estas funciones inician y detienen un contador de segundos para cada jugador

function prender1() {
  if (!intervalo1) {
    intervalo1 = setInterval(() => {
      tiempo1++;

    }, 1000);
  }
}

// Detiene el contador de tiempo para el jugador 1
//
function apagar1() {
  clearInterval(intervalo1);
  intervalo1 = null;
}

// Funciones para manejar el tiempo del jugador2
// Estas funciones inician y detienen un contador de segundos para cada jugador

function prender2() {
  if (!intervalo2) {
    intervalo2 = setInterval(() => {
      tiempo2++;
    }, 1000);
  }
}
// Detiene el contador de tiempo para el jugador 2
//
function apagar2() {
  clearInterval(intervalo2);
  intervalo2 = null;
}


// Función para determinar el ganador basado en intentos y tiempo
// Retorna 1 si el primer jugador gana, 0 si el segundo gana

function ganador (primero,segundo){
  if (primero == segundo){
    if (tiempo1 < tiempo2){
      return 1
    }
    else {
      return 0
    }
  }
  if (primero < segundo){
    return 1
  }   
  else {
    return 0
  }
}

// POST para iniciar el juego con los nombres de los jugadores
// Resetea todas las variables al iniciar un juego
// Recibe un JSON con los nombres de los jugadores
router.post('/Iniciar', (req, res) => {
  const { jugador1, jugador2 } = req.body;
  jugadores = [jugador1, jugador2];
  intentos1 = [];
  intentos2 = [];
  rondas = 0;
  randomNumber = 0;
  turno = 0;
  juegos = 0;
  tiempo1 = 0;
  tiempo2 = 0; 
  res.json({ message: 'Juego iniciado', jugadores });
});

// GET para obtener el historial de partidas desde un archivo JSON
// Devuelve un lista de partidas jugadas
router.get('/historial', (req, res) => {
  const fs = require('fs');
  const path = require('path');
  const archivoJSON = path.join(__dirname, 'historial.json');
  const datos = fs.readFileSync(archivoJSON, "utf-8");
  const partidas = JSON.parse(datos).partidas || [];
  res.json({ partidas });
});
  

// GET para cambiar orden de jugadores aleatoriamente
// determina quien empieza primero
router.get('/jugando', (req, res) => {
  let cambio = Math.floor(Math.random() * 2);
  prender1();
  if (cambio === 1) {
    let temp = jugadores[0];
    jugadores[0] = jugadores[1];
    jugadores[1] = temp;
  }
  res.json({ jugadores });
});


// POST para generar un número aleatorio entre 1 y 100
// este numero es el que el jugador debend e entrar
// por cada turno cambia 

router.post('/numero', (req, res) => {
  randomNumber = Math.floor(Math.random() * 100) + 1;
  res.json({ numero: randomNumber });
});


// GET para validar si el juego ha terminado (6 juegos)
// Retorna true si el juego ha terminado, false en caso contrario
router.get('/Fin', (req, res) => {
  if (juegos === 6){
    return res.json({ valido: true });
  } else {
    return res.json({ valido: false });
  }
});


// GET para validar el número ingresado por el jugador
// Si es correcto, cambia de turno y resetea rondas
// Si es incorrecto, incrementa las rondas
// Retorna con "valido": true si es correcto, false si no lo es
router.get('/Validar', (req, res) => {
  
  const { numero } = req.query;
  if (parseInt(numero) === randomNumber) {
    if (turno === 0) {
      intentos1.push(rondas + 1);
      turno = 1; 
      prender2(); 
      apagar1();
    } else {
      intentos2.push(rondas + 1);
      turno = 0; 
      prender1();
      apagar2();
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

// GET para determinar el ganador al finalizar los 6 juegos
// Guarda el resultado en un archivo JSON

router.get('/ganador', (req,res)=>{
  let intento1n = intentos1[0]+intentos1[1]+intentos1[2];
  let intento2n = intentos2[0]+intentos2[1]+intentos2[2];
  let gana = ganador(intento1n,intento2n);
  const fs = require('fs');const path = require('path');
  const archivoJSON = path.join(__dirname, 'historial.json');
  let partidas = [];
  const datos = fs.readFileSync(archivoJSON, 'utf-8');
  partidas = JSON.parse(datos).partidas || [];
  
  if (gana == 1){
    const partida = {
      ganador: jugadores[0],
      perdedor:jugadores[1],
      intentosGanador: intentos1,
      intentosPerdedor:intentos2,
      tiempoGanador: tiempo1,
      tiempoPerdedor: tiempo2
    };
    partidas.push(partida);
    fs.writeFileSync(archivoJSON, JSON.stringify({ partidas }, null, 2));
    res.json({ 
      Ganador : jugadores[0],
      perdedor: jugadores[1],
      ganadorintentos: intentos1,
      perdedorintentos2: intentos2,
      tiempoGanador: tiempo1,     
      tiempoPerdedor: tiempo2
    });
  }
  else {
      const partida = {
      ganador: jugadores[1],
      perdedor:jugadores[0],
      intentosGanador: intentos2,
      intentosPerdedor:intentos1,
      tiempoGanador: tiempo2,
      tiempoPerdedor: tiempo1
    };
    partidas.push(partida);
    fs.writeFileSync(archivoJSON, JSON.stringify({ partidas }, null, 2));
    
    res.json({ 
      Ganador : jugadores[1],
      perdedor: jugadores[0],
      ganadorintentos: intentos2,
      perdedorintentos2: intentos1, 
      tiempoGanador: tiempo2,     
      tiempoPerdedor: tiempo1
    });
  }
});


// GET para obtener el estado actual del juego
router.get('/rondas', (req, res) => {
  res.json({ rondas });
});
router.get('/turno', (req, res) => {
  res.json({ turno });


});

// GET para dar pistas al jugador sobre si el número es mayor o menor
router.get('/cercania', (req, res) => {
    const { numero } = req.query;
    if (numero < randomNumber) {
        return res.json({ mensaje: 'El número es mayor' });
    } else { 
        return res.json({ mensaje: 'El número es menor' });
    }
});

module.exports = router;
