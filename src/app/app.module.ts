import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuardService } from './auth/auth-guard.service';
import { AuthService } from './auth/auth.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FooterModule } from './footer/footer.module';
import { HeaderModule } from './header';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { TrainingModule } from './training/training.module';
import { DatePipe } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { appReducerToken, getAppReducers } from './store';
import { EffectsModule } from '@ngrx/effects';
import { TrainingsEffects } from './store/training/training.effects';
import { AttendancesService, EmployeeTrainingsService, TrainingsService, UsersService } from './services';
import { HttpClientModule } from '@angular/common/http';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { TrainingManagementSystemFacade } from './store/store.facade';
import { UsersEffects } from './store/users/users.effects';
import { AppliedTrainingsEffects } from './store/applied-trainings/applied-trainings.effects';
import { ProfileComponent } from './profile/profile.component';
import { AttendancesEffects } from './store/employee-attendance/employee-attendance.effects';
import { FeedbacksEffects } from './store/employee-feedback/employee-feedback.effects';
import { PreviousTrainingsComponent } from './previous-trainings/previous-trainings.component';
import { EmployeeProfileModule } from './employee-profile/employee-profile.module';
import { EmployeesComponent } from './employees/employees.component';
import { LetModule } from '@ngrx/component';
import { MyTeamComponent } from './my-team/my-team.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    ProfileComponent,
    PreviousTrainingsComponent,
    EmployeesComponent,
    MyTeamComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    HeaderModule,
    FooterModule,
    TrainingModule,
    DatePipe,
    LetModule,
    EmployeeProfileModule,
    StoreModule.forRoot(appReducerToken),
    EffectsModule.forRoot([TrainingsEffects, UsersEffects, AppliedTrainingsEffects, AttendancesEffects, FeedbacksEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 100, // Retains last 100 states
    }),
  ],
  providers: [
    AuthGuardService,
    AuthService,
    TrainingsService,
    EmployeeTrainingsService,
    UsersService,
    AttendancesService,
    TrainingManagementSystemFacade,
    {
      provide: appReducerToken,
      useFactory: getAppReducers,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
