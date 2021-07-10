
import { CategoryNode } from "../models/categoryNode";
import type { CategoryRepository } from "../repositories/categoryRepository";
import * as arrayToTree from "performant-array-to-tree";
import cache from "../core/memoryCache";
import { inject, injectable } from "inversify";
import { TypeSymbols } from "../core/IoC/types";

@injectable()
export class CategoryService {
    private categoryRepository: CategoryRepository;

    private readonly cacheKey = "category-hierarchy";

    constructor(@inject(TypeSymbols.CategoryRepository) categoryRepository?: CategoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    public async getCategoryHierarchy(): Promise<arrayToTree.TreeItem[]> {
        const hierarchy = cache.get<arrayToTree.TreeItem[]>(this.cacheKey);

        if (!hierarchy) {
            let categories = await this.categoryRepository.getCategories();
            const tree: arrayToTree.TreeItem[] = arrayToTree.arrayToTree(categories, { parentId: "parent_id", dataField: null });

            cache.set(this.cacheKey, tree);

            return tree;
        }

        return hierarchy;
    }
}