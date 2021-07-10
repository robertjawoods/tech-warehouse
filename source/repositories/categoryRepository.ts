import { Pool } from "pg";
import { inject, injectable } from "inversify";
import { CategoryNode } from "../models/categoryNode";
import { TypeSymbols } from "../core/IoC/types";

@injectable()
export class CategoryRepository {
    pool: Pool;
    constructor(@inject(TypeSymbols.Pool) pool?: Pool) {
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