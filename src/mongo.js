import mongoose from "mongoose";

mongoose.connect('mongodb+srv://786aijazusmaan:Saniaz.12@cluster0.o7qx8z5.mongodb.net/main', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

const productInfoSchema = new mongoose.Schema({
    name: String,
    price: String,
    costPrice: String,
    category: String,
    extra: {
        name: String,
        price: String,
    }
}, {
    collection: 'products'
})

export const productModel = mongoose.model('products', productInfoSchema);