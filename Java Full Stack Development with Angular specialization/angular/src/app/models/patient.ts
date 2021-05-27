export class Patient {
    id?: number;
    firstName?: string;
    lastName?: string;
    gender?: string;
    dob?: string;
    mobile?: any;
    email?: string;
    description?: string;
    registeredTime?: string;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}