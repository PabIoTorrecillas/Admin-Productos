import { Router } from "express";
import { createProduct } from "./handlers/product";

const router = Router();

router.get("/products", (req, res) => {
    res.json("Desde GET");
});

router.post("/products", createProduct);

router.put("/products", (req, res) => {
    res.json("Desde PUT");
});

router.patch("/products", (req, res) => {
    res.json("Desde PATCH");
});

router.delete("/products", (req, res) => {
    res.json("Desde DELETE");
});

export default router;