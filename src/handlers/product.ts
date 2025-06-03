import { Request, Response } from "express";
import Product from "../models/Prodcut.model";

export const getProducts = async  (req: Request, res: Response) => {
try {
        const products = await Product.findAll({
            order:[
                ['price', 'DESC']
            ],
            attributes:{exclude:['createdAt', 'updatedAt']},
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
                'createdAt', 'updatedAt'
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
        res.status(201).json({data:product});
    } catch (error) {
        
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

export const updateAvailability = async (req: Request, res: Response) => {
    const { id } = req.params;
        const product = await Product.findByPk(id)
        
        if (!product) {
            return res.status(404).json({error: "Product not found"
            })
        }

        // Update the product with the new data
        product.availability = !product.dataValues.availability;
        await product.save();

        console.log(product.dataValues)

        res.json({data:product});

}

export const deleteProduct = async (req: Request, res: Response) => {
        const { id } = req.params;
        const product = await Product.findByPk(id)
        
        if (!product) {
            return res.status(404).json({error: "Product not found"
            })
        }

        await product.destroy();
        res.json({message: "Product deleted successfully"});
}