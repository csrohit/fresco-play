export class Patient {
    patient_Id?: string;
    patient_name?: string;
    patient_gender?: string;
    patient_dob?: string;
    patient_mobile?: number;
    patient_email?: string;
    desc?: string;
    registeredDate?: string;
    // regTime: Date;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}
