import express from "express";
import * as Schemas from "./src/mongo.js";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
app.use(bodyParser.json(), cors());

app.get('/', (req, res) => {
    res.status(200).send(
        "Welcome to Royal Traders API"
    )
});

app.post('/add-product', async(req, res) => {
    const { name, price, costPrice, category, extra } = req.body;

    const newProduct = new Schemas.productModel({
        name,
        price,
        costPrice,
        category,
        extra
    });

    await newProduct.save();
    res.status(200).json({ message: 'Data saved successfully' });
});

app.post('/update-product', async(req, res) => {
    try{
        const { id } = req.query;
        const { name, price, costPrice, category, extra } = req.body;

        const dataToUpdate = Object.fromEntries(
            Object.entries({name, price, costPrice, category, extra}).filter(([_, value]) => value != null)
        );

        await Schemas.productModel.updateOne(
            {_id: id},
            {$set: dataToUpdate}
        )

        res.status(200).json({ message: 'Product updated successfully' });

    } catch(err) {
        res.status(500).json({ message: 'Error updating product', err });
    }
})

app.get('/get', async(req, res) => {
    try {
        const products = await Schemas.productModel.find(); // Fetch all products
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving products', error });
    }
})

const port = 3000;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`)
})