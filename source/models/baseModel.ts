import { TreeItem } from 'performant-array-to-tree';
import { inject, injectable } from 'inversify';
import { CategoryService } from '../services/categoryService';
import { container, lazyInject } from '../core/IoC/inversify.config';
import { TypeSymbols } from '../core/IoC/types';

@injectable()
export class BaseModel<T> {
	public categoryHierarchy: TreeItem[];
	public data: any;

	@lazyInject(TypeSymbols.CategoryService)
	private readonly categoryService: CategoryService;

	constructor() {}

	public async setData(data?: T): Promise<BaseModel<T>> {
		this.categoryHierarchy = await this.categoryService.getCategoryHierarchy();

		this.data = data;

		return this;
	}
}
