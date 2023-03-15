import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    password: new FormControl('', Validators.required),
  });

  constructor(private router: Router, private userSvc: UsersService) {}

  get email() { return this.loginForm.get('email'); }

  get password() { return this.loginForm.get('password'); }

  login() {
    if (this.loginForm.untouched || !this.loginForm.dirty)
      alert("Please enter values for all fields");

    this.userSvc.recogniseUser(this.email?.value, this.password?.value).subscribe(res => {
      this.router.navigate(['/home']);
      const userFullName = 'full name';
      const role = 'role';
      const id = 'user id';

      localStorage.setItem(userFullName, res.firstName + ' ' + res.lastName);
      localStorage.setItem(role, res.role);
      localStorage.setItem(id, res.id.toString());

    },
    err => {
        console.log(err);
        alert('Incorrect Email or Password');
      }
    );
  }

  navigateToRegister(){
    this.router.navigate(['/register']);
  }


}
