import {LoginRequest} from './LoginRequest';

export class EmailLoginRequest extends LoginRequest {
  email: string;
  constructor(email: string, password: string) {
    super(password);
    this.email = email;
  }
}
