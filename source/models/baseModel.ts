import { TreeItem } from 'performant-array-to-tree';
import { inject, injectable } from 'inversify';
import { CategoryService } from '../services/categoryService';
import { container, lazyInject } from '../core/IoC/inversify.config';
import { TypeSymbols } from '../core/IoC/types';
import * as helperFunctions from '../models/helperFunctions';

@injectable()
export class BaseModel<T> {
	public categoryHierarchy: TreeItem[];
	public data: any;

	public helperFunctions: any = helperFunctions;

	@lazyInject(TypeSymbols.CategoryService)
	private readonly categoryService: CategoryService;

	constructor() { }

	public async setData(data?: T): Promise<BaseModel<T>> {
		this.categoryHierarchy = await this.categoryService.getCategoryHierarchy();

		this.data = data;

		return this;
	}
}
