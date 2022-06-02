import { Router } from "express";
import AuthCtrl from "../controllers/AuthCtrl";

export class AuthRoutes {

    private routes: Router;

    public constructor() {

        this.routes = Router();

        this.routes.get('/', AuthCtrl.getToken);
    }

    public getRoutes(): Router {
        return this.routes;
    }
}
