import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {  Router } from '@angular/router';
import { Observable, take } from 'rxjs';
import { User } from '../models/user.interface';
import { TrainingManagementSystemFacade } from '../store/store.facade';
@Component({
  selector: 'app-my-team',
  templateUrl: './my-team.component.html',
})
export class MyTeamComponent implements OnInit {
  employees$: Observable<User[]>;

  constructor(
    private facade: TrainingManagementSystemFacade,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.facade.loadUsers();
    this.facade.loadTrainings();
    this.facade.loadAppliedTrainings();

    this.employees$ = this.facade.getEmployeesForManager(localStorage.getItem('full name') as string);
   
  }

  goToEmployeeDetails(id: number): void {
    this.router.navigate([`employees/${id}`]);
  }

}
