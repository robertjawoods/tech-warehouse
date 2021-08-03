import * as express from 'express';
import { Controller, Get } from '@overnightjs/core';
import { container } from '../../core/IoC/inversify.config';
import { IProduct } from '../../models/interfaces/IProduct';
import { ProductListingModel } from '../../models/productListing';
import ProductService from '../../services/productService';
import { CategoryService } from '../../services/categoryService';
import { TypeSymbols } from '../../core/IoC/types';
import { CategoryNode } from '../../models/categoryNode';
import { BaseModel } from '../../models/baseModel';
@Controller('products')
export class ProductListingController {
	private readonly productService: ProductService;
	private readonly categoryService: CategoryService;

	constructor() {
		this.productService = container.get(TypeSymbols.ProductService);
		this.categoryService = container.get(TypeSymbols.CategoryService);
	}

	@Get('d=:divisionName')
	async getDivision(request: express.Request, response: express.Response) {
		const categoryName = request.params.divisionName;

		const category: CategoryNode = await this.categoryService.getCategoryByName(categoryName);

		const children: number[] = await this.categoryService.getChildCategories(category.id);

		const products = await this.productService.getProducts(category.id, children);

		const model = new BaseModel();

		await model.setData({ categoryName, products });

		response.render('product/listing', { model });
	}

	@Get(':divisionName')
	async getCategory(request: express.Request, response: express.Response) {
		const categoryName = request.params.divisionName;

		console.log("h");
		const products = await this.productService.getCategoryProducts(categoryName);

		const model = new BaseModel();

		console.time('cache');
		await model.setData({ categoryName, products });
		console.timeEnd('cache');

		response.render('product/listing', { model });
	}
}
