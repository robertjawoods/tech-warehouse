import { TreeItem } from "performant-array-to-tree";
import { autoInjectable } from "tsyringe";
import { CategoryService } from "../services/categoryService";
import { container } from "../core/IoC/container";

@autoInjectable()
export class BaseModel<T> {
    public categoryHierarchy: TreeItem[];
    public modelData: T;

    private categoryService: CategoryService;

    constructor() {
        this.categoryService = container.resolve(CategoryService);
    }

    public async setData(data: T): Promise<BaseModel<T>> {
        this.categoryHierarchy = await this.categoryService.getCategoryHierarchy();

        this.modelData = data;
        return this;
    }
}