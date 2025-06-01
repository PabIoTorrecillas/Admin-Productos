import { Request, Response } from "express";
import { check, validationResult } from "express-validator";
import Product from "../models/Prodcut.model";

export const createProduct = async (req: Request, res: Response) => {

    // Validate request body
    await check('name').notEmpty().withMessage('El nombre del producto no puede ir vacio').run(req);
    await check('price')
            .isNumeric().withMessage('Valor no valido')
            .notEmpty().withMessage('El precio del producto no puede ir vacio')
            .custom(value => value > 0).withMessage('El precio del producto debe ser mayor a 0').run(req);


    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const product = await Product.create(req.body);
    res.json({data:product});
};