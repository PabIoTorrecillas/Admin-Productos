import express from "express";
import Router from "./router";

const server = express();

server.use('/api/products', Router);

export default server;
