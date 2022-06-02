import { v4 } from "uuid";
import { encode } from "js-base64";

import AuthTokenRepository from "../repositories/AuthTokenRepository";

export default class AuthTokenUseCases {

    private repo: AuthTokenRepository

    public constructor() {

        this.repo = new AuthTokenRepository();
    }

    public async generateToken(): Promise<string> {

        const token = encode(v4());
        this.repo.create(token);

        return token;
    }

    public async is_valid(token: string): Promise<boolean> {

        return this.repo.has_Key(token);
    }

} 