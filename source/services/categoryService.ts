import * as arrayToTree from 'performant-array-to-tree';
import { inject, injectable } from 'inversify';
import type { CategoryRepository } from '../repositories/categoryRepository';
import { RedisCache } from '../core/cache';
import { TypeSymbols } from '../core/IoC/types';
import { TreeItem } from 'performant-array-to-tree';
import { CategoryNode } from '../models/categoryNode';

@injectable()
export class CategoryService {
	private readonly categoryRepository: CategoryRepository;

	constructor(@inject(TypeSymbols.CategoryRepository) categoryRepository?: CategoryRepository) {
		this.categoryRepository = categoryRepository;
	}

	public async getCategoryHierarchy(): Promise<arrayToTree.TreeItem[]> {
		return this.categoryRepository.getCategories();
	}

	public async getCategoryByName(categoryName: string): Promise<CategoryNode> {
		return this.categoryRepository.getCategoryByName(categoryName);
	}

	public async getChildCategories(parentId: number): Promise<number[]> {
		// try get current child category result from cache


		const categories = await this.categoryRepository.getCategories();

		const category = categories.find(c => c.id === parentId);
		let result: number[] = [];
		let hasChildren: TreeItem[] = [];

		if (!(category.children ?? 0)) {
			return [];
		}

		for (let child of category.children) {
			result.push(child.id);

			if (child.children.length ?? 0 > 0) {
				hasChildren.push(child);
			}
		}

		let stillChildren: TreeItem[] = [];
		for (let child of hasChildren) {
			result.push(child.id);

			if (child.children.length ?? 0 > 0) {
				stillChildren.push(child);
			}
		}

		return result;
	}
}
