import  request  from "supertest";
import server from "../server";

describe('GET /api', () => {
    it ('Should sent back a JSON response', async () => {
        const res = await request(server).get('/api');

        expect(res.statusCode).toBe(200);
        expect(res.headers['content-type']).toMatch(/json/)
        expect(res.body).toBe('Desde API');

        expect(res.status).not.toBe(404);
        expect(res.body).not.toBe('desde api');
    })
})