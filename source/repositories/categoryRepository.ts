import { Pool } from "pg";
import { Category } from "../models/category";
import { container } from './../core/IoC/container';

export class CategoryRepository {
    pool: Pool;
    constructor() {
        this.pool = container.resolve("Pool");
    }

    public async getCategoryHierarchy(): Promise<any> {
        const client = await this.pool.connect();

        return await client.query("select * from categories");
    }
}