import { autoInjectable } from 'tsyringe';
import { CategoryService } from '../services/categoryService';
import { BaseModel } from './baseModel';
import { IProduct } from './interfaces/IProduct';

@autoInjectable()
export class ProductListingModel extends BaseModel<[divisionName: string, products: IProduct[]]> {
	constructor() {
		super();
	}
}
