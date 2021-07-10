import { injectable } from 'inversify';
import { CategoryService } from '../services/categoryService';
import { BaseModel } from './baseModel';
import { IProduct } from './interfaces/IProduct';

@injectable()
export class ProductListingModel extends BaseModel<[divisionName: string, products: IProduct[]]> {
	constructor() {
		super();
	}
}
