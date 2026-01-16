const request = require('supertest');
const app = require('./solution'); // On teste la version étendue

describe('🛡️ Audit de Sécurité API - Groupe B', () => {

    // Test de la limite de participants
    it('doit refuser la création si plus de 50 participants', async () => {
        const response = await request(app)
            .post('/events-v2')
            .send({ 
                title: "Grand Concert", 
                date: "2028-05-20", 
                participants: 100 
            });

        expect(response.status).toBe(400);
        expect(response.body.error).toBe("Capacité maximale dépassée (50 max)");
    });

    // Test de la validité des catégories
    it('doit refuser une catégorie inexistante', async () => {
        const response = await request(app)
            .post('/events-v2')
            .send({ 
                title: "Atelier Yoga", 
                date: "2028-06-15", 
                category: "Bien-être" // Catégorie non autorisée
            });

        expect(response.status).toBe(400);
        expect(response.body.error).toContain("Catégorie invalide");
    });

    // Test de suppression
    it('doit retourner une 404 lors de la suppression d\'un ID inconnu', async () => {
        const response = await request(app).delete('/events-v2/9999');
        expect(response.status).toBe(404);
    });

    // Test de succès (Happy Path)
    it('doit créer un événement valide avec succès (201)', async () => {
        const response = await request(app)
            .post('/events-v2')
            .send({ 
                title: "Match amical", 
                date: "2028-01-01", 
                participants: 10,
                category: "Sport"
            });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('id');
    });
});