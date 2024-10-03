const express = require('express');
const app = express();
const PORT = 3000;
const cors = require('cors');
app.use(cors());


// Sample highscore list (initial data)
let highscores = [
    { name: 'Melliz', score: 10 },
    { name: 'KennyS', score: 8 },
    { name: 'pashabiceps', score: 6 },
    { name: 'Tottelito', score: 4 },
    { name: 'REZ', score: 0 },
];

// Middleware to parse JSON in request body
app.use(express.json());

// Route to get highscores
app.get('/highscores', (req, res) => {
    res.json(highscores);
});

// Route to submit a new highscore
app.post('/highscores', (req, res) => {
    const { name, score } = req.body;

    // Add the new score to the highscores array
    highscores.push({ name, score });

    // Sort the highscores in descending order (highest score first)
    highscores.sort((a, b) => b.score - a.score);

    // Keep only the top 5 scores
    highscores = highscores.slice(0, 5);

    res.status(201).json(highscores);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
