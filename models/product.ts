import { Schema, model } from "mongoose";

export interface Product { 
    id: number,
    name: string,
    price: number,
    sizes: string[],
    description: string,
    categories: string[]
}

const ProductSchema = new Schema<Product>({
    id: Number,
    name: String,
    price: Number,
    sizes: [String],
    description: String,
    categories: [String]
});

export const ProductModel = model<Product>('Product', ProductSchema);