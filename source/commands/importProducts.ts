import 'reflect-metadata';
import * as fs from 'fs';
import * as FileHound from 'filehound';
import * as dotenv from 'dotenv';
import { Pool, PoolClient } from 'pg';
import { IProduct } from './../models/interfaces/IProduct';
import { registerDependencies, container } from './../core/IoC/container';

if (process.env.NODE_ENV !== 'production') {
	dotenv.config();
}

const generateProductId = (): number => {
	return Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
}

const importProducts = async (): Promise<any> => {
	const files = FileHound.create()
		.paths(__dirname + '/products')
		.findSync();

	const pool: Pool = container.resolve('Pool');
	const client: PoolClient = await pool.connect();

	for (const file of files) {
		const raw = fs.readFileSync(file);
		const product: IProduct = JSON.parse(raw.toString());

		product.id ||= generateProductId();

		await client.query('INSERT INTO products(id, name, price, description, category_id, currencyCode) VALUES($1, $2, $3, $4, $5, $6) ON CONFLICT DO NOTHING',
			[product.id,
			product.name,
			product.price,
			product.description,
			product.category_id,
			product.currencyCode]);
	}
};

registerDependencies();

importProducts().then(
	() => {
		process.exit();
	}
).catch(error => {
	console.error(error);
	process.exit(1);
});
