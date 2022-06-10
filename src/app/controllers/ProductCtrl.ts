import { Request, Response } from "express";
import HttpSCode from "http-status-codes";
import AttributeInvalidError from "../../core/errors/AttributeInvalidError";

import ProductUseCases from "../../core/usecases/ProductUseCases";
import { DAY, MONTH } from "../utils/DateEnum";

export default class ProductCtrl {

    static useCase = new ProductUseCases();

    public static async getOption(req: Request, res: Response): Promise<Response> {

        res.header(
            'Access-Control-Request-Method',
            'OPTION,GET,POST,PATCH,PUT,DELETE,HEAD')
            .header(
                'Access-Control-Allow-Origin',
                '*'
            ).header(
                'Access-Control-Allow-Headers',
                'Content-Type, Content-Length, Authorization'
            );


        return res.status(HttpSCode.OK).end();
    }

    public static async getHead(req: Request, res: Response): Promise<Response> {

        const lastUpdate = await ProductCtrl.useCase.getLastUpdate();

        const lastModifies = ProductCtrl.lastModifiedFormat(lastUpdate);

        const products = await ProductCtrl.useCase.getAllProducts();
        const length = JSON.stringify(products).length;

        res.header(
            'Last-Modified',
            lastModifies
        ).header(
            'Content-Length',
            length.toString(),
        );

        return res.status(HttpSCode.OK).end();
    }

    public static async getAll(req: Request, res: Response): Promise<Response> {

        const lastUpdate = await ProductCtrl.useCase.getLastUpdate();

        const lastModifies = ProductCtrl.lastModifiedFormat(lastUpdate);

        res.header(
            'Last-Modified',
            lastModifies
        );

        return res.status(HttpSCode.OK)
            .json(await ProductCtrl.useCase.getAllProducts());
    }

    public static async getById(req: Request, res: Response): Promise<Response> {

        const id = Number.parseInt(req.params.id);

        try {
            const product = await ProductCtrl.useCase.getProductById(id);

            if (!product)
                return res.status(HttpSCode.NOT_FOUND).json({ msg: 'Produto não encontrado' });

            return res.status(HttpSCode.OK).json(product);
        } catch (error) {
            return res.status(HttpSCode.BAD_REQUEST)
                .json({ msg: (error as Error).message });
        }
    }

    public static async create(req: Request, res: Response): Promise<Response> {

        const productData = {
            name: req.body.name,
            code: req.body.code,
            producer: req.body.producer,
            length: req.body.length,
        };

        try {
            const product = await ProductCtrl.useCase.createProduct(productData);

            return res.status(HttpSCode.CREATED).json(product);
        } catch (error) {
            return res.status(HttpSCode.CONFLICT)
                .json({ msg: (error as Error).message });
        }
    }

    public static async update(req: Request, res: Response): Promise<Response> {

        const productData = {
            id: Number.parseInt(req.params.id),
            name: req.body.name,
            length: req.body.length,
        };

        try {
            await ProductCtrl.useCase.updateProduct(productData)

            return res.status(HttpSCode.NO_CONTENT).end();
        } catch (error) {
            if (error instanceof AttributeInvalidError) {
                return res.status(HttpSCode.BAD_REQUEST)
                    .json({ msg: (error as Error).message });
            }

            return res.status(HttpSCode.NOT_FOUND)
                .json({ msg: (error as Error).message });
        }
    }

    public static async updateFull(req: Request, res: Response): Promise<Response> {

        const productData = {
            id: Number.parseInt(req.params.id),
            newId: req.body.newId,
            name: req.body.name,
            code: req.body.code,
            producer: req.body.producer,
            length: req.body.length,
        };

        try {
            if (await ProductCtrl.useCase.getProductById(productData.id)) {
                await ProductCtrl.useCase.updateFullProduct(productData);

                return res.status(HttpSCode.NO_CONTENT).end();
            }

            productData.id = productData.newId;
            return res.status(HttpSCode.CREATED)
                .json(await ProductCtrl.useCase.createFullProduct(productData));
        } catch (error) {
            if (error instanceof AttributeInvalidError) {
                return res.status(HttpSCode.BAD_REQUEST)
                    .json({ msg: (error as Error).message });
            }

            return res.status(HttpSCode.CONFLICT)
                .json({ msg: (error as Error).message });
        }
    }

    public static async delete(req: Request, res: Response): Promise<Response> {

        try {
            await ProductCtrl.useCase.deleteProduct({
                id: Number.parseInt(req.params.id),
            });

            return res.status(HttpSCode.NO_CONTENT).end();
        } catch (error) {
            if (error instanceof AttributeInvalidError) {
                return res.status(HttpSCode.BAD_REQUEST)
                    .json({ msg: (error as Error).message });
            }

            return res.status(HttpSCode.NOT_FOUND)
                .json({ msg: (error as Error).message });
        }
    }

    public static lastModifiedFormat(lastUpdate: Date) {
        return '' + DAY[lastUpdate.getDay() + 1] + ', '
            + (lastUpdate.getDate() > 9 ? lastUpdate.getDate() : '0' + lastUpdate.getDate())
            + ' ' + MONTH[lastUpdate.getMonth() + 1]
            + ' ' + lastUpdate.getFullYear()
            + ' ' + (lastUpdate.getHours() + 3 > 9 ? lastUpdate.getHours() + 3 : '0' + (lastUpdate.getHours() + 3))
            + ':' + (lastUpdate.getMinutes() > 9 ? lastUpdate.getMinutes() : '0' + lastUpdate.getMinutes())
            + ':' + (lastUpdate.getSeconds() > 9 ? lastUpdate.getSeconds() : '0' + lastUpdate.getSeconds())
            + ' GMT';
    }

}