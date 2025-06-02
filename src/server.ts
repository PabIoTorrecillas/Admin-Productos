import express from "express";
import Router from "./router";
import db from "./config/db";
import colors from "colors";
import cors, {CorsOptions} from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerSpec, { swaggerUiOptions } from "./config/swagger";

//Conextar a la base de datos
export async function connectDB() {
    try {
        await db.authenticate();
        db.sync();
       // console.log(colors.blue.bold("Conectado a la base de datos"));
    }
    catch (error) {
        console.log(colors.red.bold("Huvo un error al conectar a la base de datos"));   
    }
}
connectDB();
const server = express();

// Permitir conexiones CORS
const corsOptions:CorsOptions = {
    origin: function(origin, callback) {
        if (!origin || origin === process.env.FRONTEND_URL) {
            callback(null, true);
        } else {
            callback(new Error('Error de CORS: El origen no está permitido'));
        }
    }
}
server.use(cors(corsOptions));

//Leer datos de formulario
server.use(express.json());

server.use('/api/products', Router);

server.get('/api', (req, res) => {
    res.json('Desde API');
});

// Docs
server.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, swaggerUiOptions) )

export default server;
