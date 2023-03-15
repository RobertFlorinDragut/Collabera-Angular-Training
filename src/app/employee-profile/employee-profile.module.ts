import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LetModule, PushModule } from '@ngrx/component';
import { EmployeeProfileComponent } from './employee-profile.component';
import { EmployeeProfileRoutingModule } from './employee-profile-routing.module';

@NgModule({
  imports: [
    CommonModule,
    EmployeeProfileRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    PushModule, LetModule
  ],
  declarations: [EmployeeProfileComponent],
  exports: [EmployeeProfileComponent]
})
export class EmployeeProfileModule { }