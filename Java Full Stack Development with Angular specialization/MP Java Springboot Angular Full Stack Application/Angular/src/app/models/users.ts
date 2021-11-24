export class Users {
    user_name: string;
    password: string;
    user_mobile: number;
    user_email: string;
    // user_dob: Date;
    location: string;

    constructor( values: Object = {}){
        Object.assign(this, values);
    }
}