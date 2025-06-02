import request from "supertest";
import server from "../../server";


describe('POST /api/products', () => {
    it('Should display validation errors', async () => {
             const response = await request(server).post('/api/products').send({})
        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty('errors');
        expect(response.body.errors).toHaveLength(4);

        expect(response.statusCode).not.toBe(401);
        expect(response.body.errors).not.toHaveLength(2);


    })

    it('Should validate that the price is greater than 0', async () => {
             const response = await request(server).post('/api/products').send({
            name:"Monitor-testing",
            price: 0
             })
        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty('errors');
        expect(response.body.errors).toHaveLength(1);

        expect(response.statusCode).not.toBe(401);
        expect(response.body.errors).not.toHaveLength(2);


    })

    it('Should validate that the price is a number and greater than 0', async () => {
             const response = await request(server).post('/api/products').send({
            name:"Monitor-testing",
            price: "Hola"
             })
        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty('errors');
        expect(response.body.errors).toHaveLength(2);

        expect(response.statusCode).not.toBe(404);
        expect(response.body.errors).not.toHaveLength(4);


    })


    it('Should create a new product', async () => {
        const response = await request(server).post('/api/products').send({
           name:"Mouse-testing",
            price: 450
})

        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('data');

        expect(response.status).not.toBe(404)
        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty('error');

    });
})

describe('GET /api/products', () => {
    it('Should check if api7 products url exists', async () => {
      const response = await request(server).get('/api/products');
      expect(response.status).not.toBe(404);  
    })
    it('GET a JSON response with products', async () => {
        const response = await request(server).get('/api/products');
        expect(response.status).toBe(200);
        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.body).toHaveProperty('data');
        expect(response.body.data).toHaveLength(1)

        expect(response.body).not.toHaveProperty('errors');
        expect(response.status).not.toBe(404);
        expect(response.status).not.toBe(500);
})
})