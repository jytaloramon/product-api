import { Request, Response } from "express";
import HttpSCode from "http-status-codes";

import AuthTokenUseCases from "../../core/usecases/AuthTokenUseCases";

export default class AuthCtrl {

    static useCase = new AuthTokenUseCases();

    public static async getToken(req: Request, res: Response): Promise<Response> {

        return res.status(HttpSCode.OK)
            .json({ 'token': await AuthCtrl.useCase.generateToken() });
    }

    
}