export class Patient {
    userId: string;
    fname: string;
    lname: string;
    gender: string;
    dob: string;
    mobile: number;
    email: string;
    desc?: string;
    // regTime: Date;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}