import { Router } from "express";

import ProductCtrl from "../controllers/ProductCtrl";
import authMw from '../middlewares/auth/AuthMw';

export class ProductRoutes {

    private routes: Router;

    public constructor() {

        this.routes = Router();

        this.routes.options('/', ProductCtrl.getOption);
        this.routes.head('/', ProductCtrl.getHead);
        this.routes.get('/', [authMw], ProductCtrl.getAll);
        this.routes.get('/:id', [authMw], ProductCtrl.getById);
        this.routes.post('/', [authMw], ProductCtrl.create);
        this.routes.patch('/:id', [authMw], ProductCtrl.update);
        this.routes.put('/:id', [authMw], ProductCtrl.updateFull);
        this.routes.delete('/:id', [authMw], ProductCtrl.delete);
    }

    public getRoutes(): Router {
        return this.routes;
    }
}
