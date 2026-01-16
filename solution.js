const app = require('./app'); // Import de l'application de base

// Données locales pour cet exercice
let events = [];
const ALLOWED_CATEGORIES = ["Sport", "Musique", "Conférence"];

// Route POST v2 avec validations strictes
app.post('/events-v2', (req, res) => {
    const { title, date, participants, category } = req.body;

    // 1. Validation de base (Titre et Date)
    if (!title || !date) {
        return res.status(400).json({ error: "Le titre et la date sont obligatoires" });
    }

    // 2. Sécurité : Capacité maximum (Mission Groupe A)
    if (participants > 50) {
        return res.status(400).json({ error: "Capacité maximale dépassée (50 max)" });
    }

    // 3. Sécurité : Catégories autorisées (Mission Groupe A)
    if (category && !ALLOWED_CATEGORIES.includes(category)) {
        return res.status(400).json({ error: "Catégorie invalide. Choix: Sport, Musique, Conférence" });
    }

    const newEvent = { 
        id: Date.now(), 
        title, 
        date, 
        participants: participants || 0, 
        category: category || "Non classé" 
    };
    
    events.push(newEvent);
    res.status(201).json(newEvent);
});

// Route DELETE (Mission Groupe A)
app.delete('/events-v2/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = events.findIndex(e => e.id === id);

    if (index === -1) {
        return res.status(404).json({ error: "Événement introuvable" });
    }

    events.splice(index, 1);
    res.status(204).send(); 
});

module.exports = app;