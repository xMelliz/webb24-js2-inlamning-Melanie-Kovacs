const express = require('express');
const app = express();
const PORT = 3000;
const cors = require('cors');
app.use(cors());



let highscores = [
    { name: 'Melliz', score: 10 },
    { name: 'KennyS', score: 8 },
    { name: 'pashabiceps', score: 6 },
    { name: 'Tottelito', score: 4 },
    { name: 'REZ', score: 0 },
];


app.use(express.json());


app.get('/highscores', (req, res) => {
    res.json(highscores);
});


app.post('/highscores', (req, res) => {
    const { name, score } = req.body;

    
    highscores.push({ name, score });

    
    highscores.sort((a, b) => b.score - a.score);

   
    highscores = highscores.slice(0, 5);

    res.status(201).json(highscores);
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
