import {Injectable} from '@angular/core';
import {Actions,  createEffect,  ofType} from '@ngrx/effects';
import {catchError, debounce, map, switchMap} from 'rxjs/operators';
import { EmployeeTrainingsService } from '../../services';
import * as fromActions from './applied-trainings.actions';

@Injectable({
  providedIn: 'root'
})
export class AppliedTrainingsEffects {

  constructor(private empTrSvc: EmployeeTrainingsService, private actions: Actions) {
  }

  loadAppliedTrainingsEffect$ = createEffect(() =>  this.actions.pipe(
    ofType(fromActions.LoadAppliedTrainingsAction),
    switchMap(() => {
      return this.empTrSvc.getEmployeeTrainings()
        .pipe(
          map(employeeTrainings => fromActions.LoadAppliedTrainingsSuccessAction({employeeTrainings})),
          catchError(err => [fromActions.LoadAppliedTrainingsFailAction(err)])
        );
    })
  ));

  applyToTraining$ =  createEffect(() => this.actions.pipe(
    ofType(fromActions.ApplyToTrainingAction),
    switchMap(action => {
      return this.empTrSvc.applyToTraining(action.employeeTraining).pipe(
        map(training =>  fromActions.LoadAppliedTrainingsAction()),
        catchError(error => [fromActions.ApplyTrainingFailedAction(error)])
      );
    })
  ));

  cancelApplication$ =  createEffect(() => this.actions.pipe(
    ofType(fromActions.CancelApplicationAction),
    switchMap(action => {
      return this.empTrSvc.cancelApplication(action.id).pipe(
        map(
          training =>  fromActions.LoadAppliedTrainingsAction())
      );
    })
  ));

  approveTrainingApplication$ =  createEffect(() => this.actions.pipe(
    ofType(fromActions.ApproveTraining),
    switchMap(action => {
      return this.empTrSvc.approveTrainingApplication(action.employeeTraining).pipe(
        map(training =>  fromActions.LoadAppliedTrainingsAction()),
        catchError(error => [fromActions.ApplyTrainingFailedAction(error)])
      );
    })
  ));

  declineTrainingApplication$ =  createEffect(() => this.actions.pipe(
    ofType(fromActions.DeclineTraining),
    switchMap(action => {
      return this.empTrSvc.declineTrainingApplication(action.employeeTraining).pipe(
        map(training =>  fromActions.LoadAppliedTrainingsAction())
      );
    })
  ));

}
