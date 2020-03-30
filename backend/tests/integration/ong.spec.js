const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('ONG', () => {
    beforeEach(async () => {
        await connection.migrate.rollback();
        await connection.migrate.latest();
    });

    afterAll(async () => {
        await connection.destroy();
    })

    it('should be able to create a new ONG', async () => {
        const response = await request(app)
        .post('/ongs')
        .send({
            name: "APAE", 
            email: "apae@emal.com",
            whatsapp: "17992018699",
            city: "Viradouro",
            uf: "SP"
        });

        expect(response.body).toHaveProperty('id');
        expect(response.body).toHaveLength(8);
    });
})