export class Credentials {
    userId: number;
    username: string;
    password: string;
    isLoggedIn: boolean;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}
