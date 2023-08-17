
import { config } from 'dotenv';
import express from 'express';
import { json } from 'body-parser';

import ProductsDb from './src/services/db';

import productsRouter from './src/routes/products';

config();
const app = express();
app.use(json());
app.use('/product', productsRouter);

app.listen(5050,()=>{
    console.log("server started on port 5050");
    ProductsDb.init();
});


