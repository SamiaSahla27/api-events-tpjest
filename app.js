const express = require('express');
const app = express();
app.use(express.json()); // Pour lire le JSON dans le corps des requêtes



app.get('/events', (req, res) => {
    res.json({ message: "Bienvenue sur l'API Events !" });
});

// POST /events : Créer un nouvel événement
app.post('/events', (req, res) => {
    try{
            const newEvent = req.body;

    // --- LOGIQUE MÉTIER (À tester via CI/CD !) ---

    // 1. Validation basique
    if (!newEvent.title || !newEvent.date) {
        return res.status(400).json({
            error: "Le titre et la date sont obligatoires"
        });
    }

    // 2. Validation Logique : Pas d'événement dans le passé
    const eventDate = new Date(newEvent.date);
    const today = new Date();
    // On retire l'heure pour comparer uniquement les jours
    today.setHours(0, 0, 0, 0);

    if (eventDate < today) {
        return res.status(400).json({
            error: "La date ne peut pas être dans le passé"
        });
    }

    // --- FIN LOGIQUE ---

    // Ajout de l'événement (Simulation ID auto-incrémenté)
    newEvent.id = events.length + 1;
    console.log("Données reçues :", newEvent);
    events.push(newEvent);

    res.status(201).json(newEvent);
    } catch (error) {
        console.error("LE BUG EST ICI :", error); // Ceci s'affichera dans votre terminal
        res.status(500).json({ message: error.message });

    }

});

// Export de l'app (nécessaire pour les tests unitaires sans lancer le serveur)
module.exports = app;