const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('ONG', () => {

    beforeEach(async () => {
        await connection.migrate.rollback();
        await connection.migrate.latest();
    });

    afterAll(() => {
        connection.destroy();
    });

    it('should be able to create new ONG', async () => {
        const response = await request(app)
            .post('/ongs')
            .send({
                name: "Gabriel",
                email: "gabriel@gabriel.com.br",
                whatsapp: "85987881953",
                uf: "CE",
                city: "Fortaleza"
            });

        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toHaveLength(8);
    });
});