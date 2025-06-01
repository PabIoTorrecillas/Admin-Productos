import { Router } from "express";
import { createProduct, deleteProduct, getProductById, getProducts, updateAvailability, updateProduct } from "./handlers/product";
import { body, param } from "express-validator";
import { handleInputErrors } from "./middleware";


const router = Router();

router.get("/", getProducts);

router.get("/:id", 
// Validate request parameters
    param('id')
            .isInt().withMessage('El id debe ser un numero'),
    handleInputErrors,
    getProductById);

router.post("/",
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

router.put("/:id",
    param('id')
            .isInt().withMessage('El id debe ser un numero'),
    body('name')
            .notEmpty().withMessage('El nombre del producto no puede ir vacio'),
    body('price')
            .isNumeric().withMessage('Valor no valido')
            .notEmpty().withMessage('El precio del producto no puede ir vacio')
            .custom(value => value > 0).withMessage('El precio del producto debe ser mayor a 0'),
    body('availability')
            .isBoolean().withMessage('El valor de disponibilidad debe ser un booleano'),
            handleInputErrors,
    updateProduct
)

router.patch("/:id", 
    param('id')
            .isInt().withMessage('El id debe ser un numero'),
            handleInputErrors,
            updateAvailability);

router.delete("/:id", 
    param('id')
            .isInt().withMessage('El id debe ser un numero'),
            handleInputErrors,
    deleteProduct
        );

export default router;