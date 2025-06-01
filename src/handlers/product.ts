import { Request, Response } from "express";
import Product from "../models/Prodcut.model";

export const getProducts = async  (req: Request, res: Response) => {
try {
        const products = await Product.findAll({
            order:[
                ['price', 'DESC']
            ],
            attributes:{exclude:['createdAt', 'updatedAt','availability']},
            })
        res.json({data:products})
    
} catch (error) {
    
}}


export const createProduct = async (req: Request, res: Response) => {
    try {
        const product = await Product.create(req.body);
        res.json({data:product});
    } catch (error) {
        console.error(error);
    }
}