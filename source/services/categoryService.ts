import type { CategoryRepository } from "../repositories/categoryRepository";
import * as arrayToTree from "performant-array-to-tree";
import { RedisCache } from "../core/cache";
import { inject, injectable } from "inversify";
import { TypeSymbols } from "../core/IoC/types";

@injectable()
export class CategoryService {
    private readonly categoryRepository: CategoryRepository;
    private readonly cache: RedisCache;

    constructor(@inject(TypeSymbols.CategoryRepository) categoryRepository?: CategoryRepository, @inject(TypeSymbols.RedisCache) cache?: RedisCache) {
        this.categoryRepository = categoryRepository;
        this.cache = cache;
    }

    public async getCategoryHierarchy(): Promise<arrayToTree.TreeItem[]> {
        return await this.categoryRepository.getCategories();
    }
}