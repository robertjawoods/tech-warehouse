import { Schema, model, ObjectId } from "mongoose";
import { IProduct } from "./interfaces/IProduct";

const formatCurrency = (price, currencyCode) => {
    var formatter = new Intl.NumberFormat("en-GB", {
        style: "currency",
        currency: currencyCode,
    });

    return formatter.format(price);
}

const ProductSchema = new Schema<IProduct>({
    _id: String,
    name: String,
    price: Number,
    sizes: [String],
    description: String,
    categories: [String],
    currencyCode: String
}, { _id: false });

ProductSchema.virtual("formattedPrice").get(function () {
    return formatCurrency(this.price, this.currencyCode);
});

export const ProductModel = model<IProduct>('Product', ProductSchema);