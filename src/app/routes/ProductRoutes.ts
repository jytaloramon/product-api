import { Router } from "express";

import ProductCtrl from "../controllers/ProductCtrl";
import authMw from '../middlewares/auth/AuthMw';
import AuthPermissionMw from "../middlewares/auth/AuthPermissionMw";

export class ProductRoutes {

    private routes: Router;

    public constructor() {

        this.routes = Router();

        this.routes.options('/', [authMw], ProductCtrl.getOption);
        this.routes.head('/', [authMw], ProductCtrl.getHead);
        this.routes.get('/', [authMw], ProductCtrl.getAll);
        this.routes.get('/:id', [authMw], ProductCtrl.getById);
        this.routes.post('/', [authMw, AuthPermissionMw.permWrite], ProductCtrl.create);
        this.routes.patch('/:id', [authMw, AuthPermissionMw.permWrite], ProductCtrl.update);
        this.routes.put('/:id', [authMw, AuthPermissionMw.permWrite], ProductCtrl.updateFull);
        this.routes.delete('/:id', [authMw, AuthPermissionMw.permWrite], ProductCtrl.delete);
    }

    public getRoutes(): Router {
        return this.routes;
    }
}
