export class LoginResponse {
  message: string;
  success: boolean;
  token: string;
  id: string;

    constructor( values: Object = {}){
        Object.assign(this, values);
    }
}

