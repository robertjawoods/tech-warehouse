import * as mongoose from 'mongoose';
import {ProductModel} from '../models/product';
import {IProduct} from '../models/interfaces/IProduct';
const fs = require('fs');
const filehound = require('filehound');

if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}

const importProducts = async (): Promise<any> => {
	filehound.create()
		.paths(process.cwd())
		.depth(0)
		.find()
		.then(files => files.forEach(file => {
			console.log(file);
		}));

	return mongoose.connect(process.env.MONGO_CONNECTION_STRING, {
		useUnifiedTopology: true,
		useNewUrlParser: true
	})
		.then(() => {
			const product = new ProductModel();
			product._id = 12_345;
			product.name = 'rest';

			product.save();

			const db = mongoose.connection;
			// Var db = mongoose.connection;

			// db.once("open", async () => {
			//     filehound.create()
			//         .paths(process.cwd())
			//         .depth(0)
			//         .find()
			//         .then(files => files.forEach(file => {
			//             console.log(file);
			//         }));

			//     console.log("hi");

			//     // var products: IProduct[] = [];
			//     // for (var key in files) {
			//     //     var fileName: string = files[key];
			//     //     var raw = fs.readFileSync(fileName);
			//     //     var product: IProduct = JSON.parse(raw);

			//     //     products.push(product);
			//     // }

			//     //container.resolve(LogService).instance.log("info", `Found ${products.length} products`);

			//     // await ProductModel.insertMany(products)
			//     //     .catch(err => {
			//     //         console.log(err);
			//     //     });
			// });

			// db.on("error", console.error.bind(console, 'conn error:'));
		});
};

importProducts().then(
	() => {
		process.exit();
	}
);
