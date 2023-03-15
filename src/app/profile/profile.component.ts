import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, take } from 'rxjs';
import { User } from '../models/user.interface';
import { TrainingManagementSystemFacade } from '../store/store.facade';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  updateForm: FormGroup = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
    ]),
    password: new FormControl('', Validators.required),
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    mobileNo: new FormControl('', [
      Validators.required,
      Validators.pattern('[- +()0-9]+'),
    ]),
    address: new FormControl('', [Validators.required]),
  });

  employeeId: number;
  users: User[] = [];
  user$: Observable<User>;

  constructor(private facade: TrainingManagementSystemFacade) {}

  ngOnInit(): void {
    this.facade.loadUsers();
    this.employeeId = Number(localStorage.getItem('user id'));
    this.user$ = this.facade.getUserById(this.employeeId);
    this.user$.subscribe((value) => this.updateForm.patchValue(value));
  }

  get email() {
    return this.updateForm.get('email');
  }

  get password() {
    return this.updateForm.get('password');
  }

  get firstName() {
    return this.updateForm.get('firstName');
  }

  get lastName() {
    return this.updateForm.get('lastName');
  }

  get mobileNo() {
    return this.updateForm.get('mobileNo');
  }

  get address() {
    return this.updateForm.get('address');
  }

  update() {
    const user: User = this.updateForm.getRawValue();
    var emailExists;
    var phoneExists;

    this.facade
      .getUsers()
      .pipe(take(1))
      .subscribe((res) => {
        emailExists = res.filter((x) => x.email === user.email).length > 1;
        phoneExists = res.filter((x) => x.mobileNo === user.mobileNo).length > 1;
      });

      this.facade
      .getUserById(this.employeeId)
      .pipe(take(1))
      .subscribe((res) => {
       user.managerName = res.managerName;
      });


    user.id = this.employeeId;
    user.role = localStorage.getItem('role') as string;
   
    if (emailExists) {
      alert('An account with this email already exists');
    } else if (phoneExists) {
      alert('An account with this Phone Number already exists');
    } else {
      this.facade.updateUser(user);
      alert('Information updated!');
    }
  }


}
