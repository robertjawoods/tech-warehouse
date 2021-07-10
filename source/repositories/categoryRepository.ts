import { Pool } from "pg";
import { inject } from "tsyringe";
import { CategoryNode } from "../models/categoryNode";

export class CategoryRepository {
    pool: Pool;
    constructor(@inject("Pool") pool?: Pool) {
        this.pool = pool;
    }

    public async getCategories(): Promise<any> {
        return this.pool.connect()
            .then((client) => {
                return client.query("select * from categories");
            })
            .then(result => result.rows);
    }
}