export class Appointment {
	status: string;
	patientId: number;
	fname: string;
	lname: string;
	disease: string;
	priority: string;
	tentativeDate: string;
	registeredTime: any;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}
