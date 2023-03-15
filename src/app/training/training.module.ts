import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrainingRoutingModule } from './training-routing.module';
import { TrainingComponent } from './training.component';
import { TrainingHRComponent } from './training-HR/training-hr.component';
import { TrainingManagerComponent } from './training-manager/training-manager.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LetModule, PushModule } from '@ngrx/component';
import { TrainingEmployeeComponent } from './training-employee/training-employee.component';

@NgModule({
  imports: [
    CommonModule,
    TrainingRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    PushModule, LetModule
  ],
  declarations: [TrainingComponent, TrainingHRComponent, TrainingManagerComponent, TrainingEmployeeComponent],
  exports: [TrainingComponent, TrainingHRComponent, TrainingManagerComponent, TrainingEmployeeComponent]
})
export class TrainingModule { }