export default class AuthTokenRepository {

    private data: Set<string>;

    public constructor() {

        this.data = new Set();
    }

    public create(token: string): void {

        this.data.add(token);
    }

    public has_Key(token: string): boolean {
       
        return this.data.has(token);
    }
}