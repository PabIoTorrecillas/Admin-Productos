import express from "express";

const server = express();

//Routing
server.get("/", (req, res) => {
    const datos = [
        {id : 1, nombre: "Pablo"},
        {id : 2, nombre: "Gabriel"}];
    res.json(datos);
});

export default server;
