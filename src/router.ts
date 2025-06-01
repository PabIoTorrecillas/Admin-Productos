import { Router } from "express";
import { createProduct } from "./handlers/product";

const router = Router();

router.get("/productos", (req, res) => {
    res.json("Desde GET");
});

router.post("/productos", createProduct);

router.put("/productos", (req, res) => {
    res.json("Desde PUT");
});

router.patch("/productos", (req, res) => {
    res.json("Desde PATCH");
});

router.delete("/productos", (req, res) => {
    res.json("Desde DELETE");
});

export default router;