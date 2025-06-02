import  request  from "supertest";
import server, {connectDB} from "../server";
import db from "../config/db";

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

jest.mock('../config/db')

describe('connectDB', () => {
    it('should hanlde database conection errors', async () => {
        jest.spyOn(db, 'authenticate')
            .mockRejectedValueOnce(new Error('Huvo un error al conectar a la base de datos'))
        const consoleSpy = jest.spyOn(console, 'log')

        await connectDB()
        expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Huvo un error al conectar a la base de datos'))
    })
})