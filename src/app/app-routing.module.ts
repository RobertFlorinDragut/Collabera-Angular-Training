import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './auth/auth-guard.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PreviousTrainingsComponent } from './previous-trainings/previous-trainings.component';
import { EmployeesComponent } from './employees/employees.component';
import { MyTeamComponent } from './my-team/my-team.component';

const routes: Routes = [
  {
    path: `trainings/:id`,
    loadChildren: () =>
      import('./training/training.module').then((m) => m.TrainingModule),
  },
  {
    path: `employees/:id`,
    loadChildren: () =>
      import('./employee-profile/employee-profile.module').then((m) => m.EmployeeProfileModule),
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'home',
    component: DashboardComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'my-team',
    component: MyTeamComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'employees',
    component: EmployeesComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'my-trainings',
    component: PreviousTrainingsComponent,
    canActivate: [AuthGuardService],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
