export class Category {
    public name: string;
    public webName: string;
    public id: number;

    public parent: Category | null;
    public children: Category[] | null;
}