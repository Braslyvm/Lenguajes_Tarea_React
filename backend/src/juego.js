const express = require('express');
const router = express.Router();

let jugadores = [];
let intentos1 = [];
let intentos2 = [];
let rondas = 0;
let randomNumber = 0;
let turno = 0;



app,post('/api/jugando', (req, res) => {
  const { jugador1, jugador2 } = req.body;
  jugadores = [jugador1, jugador2];
  intentos1 = [];
  intentos2 = [];
  rondas = 0;
  
});

app.get('/api/jugando', (req, res) => {
    let cambio = Math.floor(Math.random() * (2 - 1 + 1)) + 1;
    if (cambio == 1) {
        let temp = jugadores[0];
        jugadores[0] = jugadores[1];
        jugadores[1] = temp;
    }
    res.json({ jugadore}); 
});


app.get ('/api/numero', (req, res) => {
    randomNumber = Math.floor(Math.random() * 100) + 1;
    res.json({ numero: randomNumber });
});

 app.get('/api/Validar', (req, res) => {
    const { numero } = req.query;
    if (numero == randomNumber){
        if (turno == 0){
            rondas++;
            intentos1.push(rondas);
            turno = 1;
            rondas = 0;
        } else {
            rondas++;
            intentos2.push(rondas);
            turno = 0;
            rondas = 0;
        }
        turno++;
        return res.json({ valido: true });
    } else {
        rondas++;
        return res.json({ valido: false });
    }
});

app.get('/api/rondas', (req, res) => {
    res.json({ rondas});
}); 


module.exports = router;
