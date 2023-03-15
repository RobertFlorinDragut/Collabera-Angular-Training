import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {  Router } from '@angular/router';
import { Observable, take } from 'rxjs';
import { User } from '../models/user.interface';
import { TrainingManagementSystemFacade } from '../store/store.facade';
@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss'],
})
export class EmployeesComponent implements OnInit {
  employees$: Observable<User[]>;
  displayAddEmployeeModal = 'none';

  addUserForm: FormGroup = new FormGroup({
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

  constructor(
    private facade: TrainingManagementSystemFacade,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.facade.loadUsers();
    this.facade.loadTrainings();
    this.facade.loadAppliedTrainings();

    this.employees$ = this.facade.getEmployees();
   
  }

  goToEmployeeDetails(id: number): void {
    this.router.navigate([`employees/${id}`]);
  }

  openAddEmployeeModal(){
    this.displayAddEmployeeModal = 'block';
  }

  
  onCloseHandled() {
    this.displayAddEmployeeModal = 'none';
    this.addUserForm.reset();
  }

  addUser(){
    const user: User = this.addUserForm.getRawValue();
    var emailExists;
    var phoneExists;
    user.role = 'Employee';
    user.managerName = 'Florin Popescu';
    this.facade
      .getUsers()
      .pipe(take(1))
      .subscribe((res) => {
        emailExists = res.filter((x) => x.email === user.email).length > 1;
        phoneExists = res.filter((x) => x.mobileNo === user.mobileNo).length > 1;
      });

      if (emailExists) {
        alert('An account with this email already exists');
      } else if (phoneExists) {
        alert('An account with this Phone Number already exists');
      } else {
        this.facade.addUser(user);
        this.onCloseHandled();
        alert('User added!');
      }
  }

  get email() {
    return this.addUserForm.get('email');
  }

  get password() {
    return this.addUserForm.get('password');
  }

  get firstName() {
    return this.addUserForm.get('firstName');
  }

  get lastName() {
    return this.addUserForm.get('lastName');
  }

  get mobileNo() {
    return this.addUserForm.get('mobileNo');
  }

  get address() {
    return this.addUserForm.get('address');
  }

}
