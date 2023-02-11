import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/model/user/user-model.model';
import { LoginService } from 'src/app/service/loginService/login.service';
import { setItemToSessionStorage } from 'src/storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(private loginService: LoginService, private router: Router) {}

  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  onSubmit() {
    const req: UserModel = {
      email: this.email.value,
      password: this.password.value,
    };
    const res = this.loginService.login(req);
    console.log(res);
    if (res.response === 'failed') {
      const alertPlaceholder = document.getElementById('liveAlertPlaceholder');
      console.log(alertPlaceholder);

      const alert = (message: String, type: String) => {
        const wrapper = document.createElement('div');
        wrapper.className = 'd-flex row justify-content-center';
        wrapper.innerHTML = [
          `<div class="alert alert-${type} w-50 alert-dismissible" role="alert">`,
          `   <div>${message}</div>`,
          '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
          '</div>',
        ].join('');
        alertPlaceholder.append(wrapper);
      };
      if (!alertPlaceholder.hasChildNodes()) {
        alert(res.message, 'danger');
      }
    }

    if (res.response === 'success') {
      const setSession = setItemToSessionStorage('session', req);
      this.router.navigateByUrl('/');
    }
    this.loginForm.reset();
  }
}
