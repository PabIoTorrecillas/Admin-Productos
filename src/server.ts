import express from "express";
import Router from "./router";
import db from "./config/db";
import colors from "colors";

//Conextar a la base de datos
async function connectDB() {
    try {
        await db.authenticate();
        db.sync();
       // console.log(colors.blue.bold("Conectado a la base de datos"));
    }
    catch (error) {
        console.error(error);
        console.log(colors.red.bold("Huevo un error al conectar a la base de datos"));   
    }
}
connectDB();
const server = express();

//Leer datos de formulario
server.use(express.json());

server.use('/api/products', Router);

server.get('/api', (req, res) => {
    res.json('Desde API');
});

export default server;
