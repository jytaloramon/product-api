import { NextFunction, Request, Response } from "express";
import HttpSCode from "http-status-codes";

export default class AuthPermissionMw {

    public static async permWrite(req: Request, res: Response, next: NextFunction): Promise<any> {
        const token = req.headers.authorization;

        if (!token?.startsWith('write-'))
            return res.status(HttpSCode.FORBIDDEN).end()

        return next();
    }

}