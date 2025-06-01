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

export const getProductById = async  (req: Request, res: Response) => {
try {
        console.log(req.params.id)
        const { id } = req.params;
        const product = await Product.findByPk(id,{
            attributes:{exclude:[
                'createdAt', 'updatedAt','availability'
            ]}
        })
        
        if (!product) {
            return res.status(404).json({error: "Product not found"});
        }

        res.json({data:product})
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

export const updateProduct = async (req: Request, res: Response) => {
        const { id } = req.params;
        const product = await Product.findByPk(id)
        
        if (!product) {
            return res.status(404).json({error: "Product not found"
            })
        }

        // Update the product with the new data
        await product.update(req.body);
        await product.save();

        res.json({data:product});
}