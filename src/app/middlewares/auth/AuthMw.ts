import { NextFunction, Request, Response } from "express";
import HttpSCode from "http-status-codes";

import AuthCtrl from "../../controllers/AuthCtrl";

const authToken = AuthCtrl.useCase

export default async (req: Request, res: Response, next: NextFunction) => {

    const token = req.headers.authorization;

    if (!token || !(await authToken.is_valid(token))) {
        return res.status(HttpSCode.UNAUTHORIZED)
            .header('WWW-Authenticate', 'Bearer realm="UUID BASE64" charset="UTF-8"')
            .end();
    }

    return next();
}