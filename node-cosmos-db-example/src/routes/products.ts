import { Router } from 'express';
import ProductsDb from '../services/db';

const router = Router();

router.post("/create",async (req, res, next)=>{
    const product = req.body;
    try{
        await ProductsDb.createProduct(product);
        res.status(200).send({message:"created product"});
    }catch(err){
        console.log('error creating product', err);
        res.status(500).send({message:"cound not create product"});
    }
});

export default router;