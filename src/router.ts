import { Router } from "express";
import { createProduct, getProducts } from "./handlers/product";
import { body } from "express-validator";
import { handleInputErrors } from "./middleware";


const router = Router();

router.get("/products", getProducts);

router.post("/products",
    // Validate request body
    body('name')
            .notEmpty().withMessage('El nombre del producto no puede ir vacio'),
    body('price')
            .isNumeric().withMessage('Valor no valido')
            .notEmpty().withMessage('El precio del producto no puede ir vacio')
            .custom(value => value > 0).withMessage('El precio del producto debe ser mayor a 0'),
    handleInputErrors,
    createProduct
);

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