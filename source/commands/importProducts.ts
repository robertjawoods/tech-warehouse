import 'reflect-metadata';
import { registerDependencies, container } from './../core/IoC/container';
import * as FileHound from 'filehound';
import * as dotenv from 'dotenv';
import { IProduct } from '../models/interfaces/IProduct';
import * as fs from 'fs';
import { BoundPool, Client } from 'pg';

if (process.env.NODE_ENV !== 'production') {
	dotenv.config();
}

const importProducts = async (): Promise<any> => {
	let files = FileHound.create()
		.paths(__dirname + '/products')
		.findSync();

	let pool: BoundPool = container.resolve("Pool");
	let client: Client = await pool.connect();

	for (let file of files) {
		var raw = fs.readFileSync(file);
		var product: IProduct = JSON.parse(raw.toString());

		await client.query('INSERT INTO products VALUES($1, $2, $3, $4, $5, $6, $7)',
			[product.id, product.name, product.price, product.description, product.categories.join(';'),
			product.currencyCode, product.sizes.join(';')]);
	}
}

registerDependencies();

importProducts().then(
	() => {
		process.exit();
	}
);
