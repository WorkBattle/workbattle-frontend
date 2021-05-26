import {LoginRequest} from './LoginRequest';

export class UsernameLoginRequest extends LoginRequest {
  username: string;
  constructor(username: string, password: string) {
    super(password);
    this.username = username;
  }
}
