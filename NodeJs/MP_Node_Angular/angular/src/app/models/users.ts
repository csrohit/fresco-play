export class Users {
    uname: string;
    pwd: string;
    mobile: number;
    email: string;
    location: string;

    constructor( values: Object = {}){
        Object.assign(this, values);
    }
}

