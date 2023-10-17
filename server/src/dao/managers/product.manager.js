import { productModel } from "../models/product.models.js";

export default class ProductManager{
    constructor(){
        console.log('Working Products')
    }

    
    getAll = async () => {
        const products = await productModel.find()
        return products.map(product => product.toObject())
    }
    getOne = async(id)=>{
        const product = await productModel.findById(id)
        return product
    }
    save = async (product) =>{
        const result = await productModel.create(product);
        return result;
    }

    update = async (id, cart)=>{
        const result = await productModel.updateOne({ _id:id}, cart);
        return result
    }
    delete = async (id) => {
            const result = await productModel.deleteOne({_id: id});
            return result
    }
}