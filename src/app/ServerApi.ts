import express, { Express, json } from "express";
import morgan from "morgan";
import { AuthRoutes } from "./routes/AuthRoutes";

import { ProductRoutes } from "./routes/ProductRoutes";

export default class ServerApi {

    private api: Express;

    public constructor(port: number) {

        this.api = express();

        this.api.use(json())
        this.api.use(morgan('dev'))

        this.api.use('/api/auths', (new AuthRoutes()).getRoutes());
        this.api.use('/api/products', (new ProductRoutes()).getRoutes());

        this.api.listen(port, () => {
            console.log(`----- Server UP (localhost:${port}) -----`);
        });
    }

}