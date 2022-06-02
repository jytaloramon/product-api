import Product from "../entities/Product";

export default class ProductRepository {

    private data: Map<number, Product>;
    private lastUpdate: Date;

    public constructor() {

        this.data = new Map<number, Product>;
        this.lastUpdate = new Date();
    }

    public getAll(): Product[] {

        const products: Product[] = [];

        for (const prod of this.data.values())
            products.push(prod);

        return products;
    }

    public create(product: Product): void {

        this.data.set(product.id, product);
        this.updateLastUpdate();
    }

    public getById(id: number): Product | null {

        return this.data.get(id) ?? null;
    }

    public getByCode(code: string): Product | null {

        for (const prod of this.data.values()) {
            if (prod.code === code)
                return prod;
        }

        return null;
    }

    public delete(id: number): boolean {

        const rs = this.data.delete(id);

        if (rs)
            this.updateLastUpdate();

        return rs;
    }

    private updateLastUpdate(): void {

        this.lastUpdate = new Date();
    }

    public getLastUpdate(): Date {

        return this.lastUpdate;
    }
}