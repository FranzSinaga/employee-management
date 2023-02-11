import { Injectable } from '@angular/core';
import { UserModel } from 'src/app/model/user/user-model.model';

export interface LoginResponse {
  response: String;
  message: String;
}

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  loginUser: UserModel = {
    email: 'user@test.com',
    password: 'P@ssw0rd',
  };
  constructor() {}

  login(req: UserModel): LoginResponse {
    const { email, password } = req;
    if (
      email === this.loginUser.email &&
      password === this.loginUser.password
    ) {
      return { response: 'success', message: 'Login succesfully' };
    }
    return { response: 'failed', message: 'Login failed' };
  }
}
