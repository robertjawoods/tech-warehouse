import { Pool } from "pg";
import { inject, injectable } from "inversify";
import { CategoryNode } from "../models/categoryNode";
import { TypeSymbols } from "../core/IoC/types";
import * as arrayToTree from "performant-array-to-tree";
import { RedisCache } from "../core/cache";
import { BaseRepository } from "./baseRepository";

@injectable()
export class CategoryRepository extends BaseRepository {
    private readonly cacheKey = "category-hierarchy";

    constructor(@inject(TypeSymbols.Pool) pool?: Pool, @inject(TypeSymbols.RedisCache) cache?: RedisCache) {
        super(pool, cache);
    }

    // need to do some custom logic so reimplemented a part 
    public async getCategories(): Promise<arrayToTree.TreeItem[]> {
        return this.tryFetchFromCache<arrayToTree.TreeItem[]>(this.cacheKey)
            .then((categories) => {
                if (!categories) {
                    return this.pool.connect()
                        .then((client) => {
                            return client.query("select * from categories");
                        })
                        .then(result => result.rows)
                        .then(rows => {
                            return arrayToTree.arrayToTree(rows, { parentId: "parent_id", dataField: null });
                        })
                }

                return categories;
            })
            .then(tree => {
                this.cache.set(this.cacheKey, tree);

                return tree;
            });
    }
}