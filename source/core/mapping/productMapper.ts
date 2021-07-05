import { IMapper } from './IMapper'

export class ProductMapper<IProduct, F> implements IMapper<IProduct, string> {
    mapAll<IProduct>(from: string[]): IProduct[] {
        throw new Error('Method not implemented.');
    }
    public map<IProduct>(from: string): IProduct {
        return JSON.parse(from);
    }

}