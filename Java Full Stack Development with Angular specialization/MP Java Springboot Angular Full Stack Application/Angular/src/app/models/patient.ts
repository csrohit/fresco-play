export class Patient {
    userId: string;
    patient_name: string;
    patient_gender: string;
    patient_dob: string;
    patient_mobile: number;
    patient_email: string;
    desc?: string;
    // regTime: Date;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}