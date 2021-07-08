import { autoInjectable } from "tsyringe";
import { Category } from "../models/category";
import { CategoryRepository } from "../repositories/categoryRepository";

@autoInjectable()
export class CategoryService {
    private categoryRepository: CategoryRepository;

    constructor(categoryRepository?: CategoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    public async getCategoryHierarchy(): Promise<Category[]> {
        await Promise.resolve(this.categoryRepository.getCategoryHierarchy()
            .then(categories => {
                return categories.rows.map(c => {

                });
            }));

        return [];
    }
}