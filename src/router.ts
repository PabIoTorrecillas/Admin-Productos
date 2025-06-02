import { Router } from "express";
import { createProduct, deleteProduct, getProductById, getProducts, updateAvailability, updateProduct } from "./handlers/product";
import { body, param } from "express-validator";
import { handleInputErrors } from "./middleware";


const router = Router();

/**  
* @swagger
* components:
*       schemas:
*               Product:
*                       type: object
*                       properties:    
*                           id:
*                                type: integer
*                                description: The product ID
*                                example: 1
*                           name:
*                                type: string
*                                description: The product name
*                                example: Monitor de 49 pulgadas
*                           price:
*                                type: number
*                                description: The product price
*                                example: 300
*                           availability:
*                                type: boolean
*                                description: The product availability
*                                example: true
*/

/**
 * @swagger
 * /api/products:
 *      get:
 *          summary: Get a list of products
 *          tags:
 *              - Products
 *          description: Return a list of products
 *          responses:
 *              200:
 *                  description: Successful response
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/Product'
 *      
 */

router.get("/", getProducts);
/**
 * @swagger
 * /api/products/{id}:
 *  get:
 *      summary: Get a product by ID
 *      tags:
 *          - Products
 *      description: Return a product based on its unique ID
 *      parameters:
 *        - in: path
 *          name: id
 *          description: The ID of the product to retrieve
 *          required: true
 *          schema:
 *              type: integer
 *      responses:
 *          200:
 *              description: Successful Response
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Product'
 *          404:
 *              description: Not found
 *          400:
 *              description: Bad Request - Invalid ID
 */
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