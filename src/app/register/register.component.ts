import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { Roles } from '../models/roles.enum';
import { User } from '../models/user.interface';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    password: new FormControl('', Validators.required),
    role: new FormControl('', Validators.required),
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    mobileNo: new FormControl('', [Validators.required, Validators.pattern('[- +()0-9]+')]),
    address: new FormControl('', [Validators.required])
  });

  users: User[] = [];

  roles = Roles;

  constructor( private router: Router, private userSvc: UsersService) {}

  ngOnInit(): void {
    this.userSvc.getUsers().pipe(take(1)).subscribe((res) => this.users = res);
  }

  register() {
    const user: User = this.registerForm.getRawValue();
    user.managerName = '';
    var emailExists = this.users.find(x => x.email === user.email);
    var phoneExists = this.users.find(x => x.mobileNo === user.mobileNo);
    if(emailExists){
      alert('An account with this email already exists');
    }
    else if(phoneExists){
      alert('An account with this Phone Number already exists');
    }

    else{
      this.userSvc.addUser(user).pipe(take(1)).subscribe((res)=>
      {
        alert("Account created");
  
      this.router.navigate(['/login']);
    }
      );
        
    }
  }

  get email() { return this.registerForm.get('email'); }

  get password() { return this.registerForm.get('password'); }

  get role() { return this.registerForm.get('role'); }

  get firstName() { return this.registerForm.get('firstName'); }

  get lastName() { return this.registerForm.get('lastName'); }

  get mobileNo() { return this.registerForm.get('mobileNo'); }

  get address() { return this.registerForm.get('address'); }
  
}
