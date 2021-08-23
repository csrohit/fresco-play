export class LoginResponse {
  email: string;
  location: string;
  message: string;
  mobile: number;
  success: boolean;
  token: string;
  uid: string;
  userName: string;

    constructor( values: Object = {}){
        Object.assign(this, values);
    }
}

