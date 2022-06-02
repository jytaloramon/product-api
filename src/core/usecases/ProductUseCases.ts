import Product from "../entities/Product";
import ProductRepository from "../repositories/ProductRepository";

import ConflitError from "../errors/ConflitError";
import NotFoundError from "../errors/NotFoundError";
import AttributeInvalidError from "../errors/AttributeInvalidError";

const generateId = (): number => {
    const base = Math.random() * 100;
    const exp = Math.random() * 10

    return Math.floor(Math.pow(base, exp)) % 10000;
}

export default class ProductUseCases {

    private repo: ProductRepository

    public constructor() {

        this.repo = new ProductRepository();
    }

    public async getAllProducts(): Promise<Product[]> {

        return this.repo.getAll();
    }

    public async getProductById(id: number): Promise<Product | null> {

        if (!id)
            throw new AttributeInvalidError('Isto não é um id válido');

        return this.repo.getById(id);
    }

    public async getProductByCode(code: string): Promise<Product | null> {

        return this.repo.getByCode(code);
    }

    public async getLastUpdate(): Promise<Date> {

        return this.repo.getLastUpdate();
    }

    public async createProduct(params: {
        name: string,
        code: string,
        producer: string,
        length: string,
    }): Promise<Product> {

        return this.createFullProduct({
            id: generateId(),
            code: params.code,
            name: params.length,
            length: params.length,
            producer: params.producer,
        });
    }

    public async createFullProduct(params: {
        id: number
        name: string,
        code: string,
        producer: string,
        length: string,
    }): Promise<Product> {

        if (this.repo.getByCode(params.code))
            throw new ConflitError('Código já existente');

        if (this.repo.getById(params.id))
            throw new ConflitError('Id já existente');

        const product = new Product();
        product.id = params.id;
        product.name = params.name;
        product.code = params.code;
        product.producer = params.producer;
        product.length = params.length;

        this.repo.create(product);

        return product;
    }

    public async updateProduct(params: {
        id: number,
        name: string,
        length: string,
    }): Promise<Product> {

        if (!params.id)
            throw new AttributeInvalidError('Isto não é um id válido');

        const product = this.repo.getById(params.id);

        if (!product)
            throw new NotFoundError('Produto não existe');

        product.name = params.name;
        product.length = params.length;

        return product;
    }

    public async updateFullProduct(params: {
        id: number,
        newId: number,
        name: string,
        code: string,
        producer: string,
        length: string,
    }): Promise<Product> {

        if (!params.id)
            throw new AttributeInvalidError('Isto não é um id válido');

        const product = this.repo.getById(params.id);

        if (!product)
            throw new NotFoundError('Produto não existe');

        if (this.repo.getByCode(params.code)?.id !== product.id)
            throw new ConflitError('Código já existente');

        this.repo.delete(product.id);

        return this.createFullProduct({
            id: params.newId,
            code: params.code,
            name: params.length,
            length: params.length,
            producer: params.producer,
        });
    }

    public async deleteProduct(params: {
        id: number,
    }): Promise<void> {

        if (!params.id)
            throw new AttributeInvalidError('Isto não é um id válido');

        const product = this.repo.getById(params.id);

        if (!product)
            throw new NotFoundError('Produto não existe');

        this.repo.delete(params.id);
    }

}
