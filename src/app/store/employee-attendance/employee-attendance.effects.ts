import {Injectable} from '@angular/core';
import {Actions,  createEffect,  ofType} from '@ngrx/effects';
import {catchError, map, switchMap} from 'rxjs/operators';
import { AttendancesService } from '../../services';
import * as fromActions from './employee-attendance.actions';

@Injectable({
  providedIn: 'root'
})
export class AttendancesEffects {

  constructor(private attendancesSvc: AttendancesService, private actions: Actions) {
  }

  loadAttendancesEffect$ = createEffect(() =>  this.actions.pipe(
    ofType(fromActions.LoadAttendancesAction),
    switchMap(() => {
      return this.attendancesSvc.getAttendances()
        .pipe(
          map(attendances => fromActions.LoadAttendancesSuccessAction({attendances})),
          catchError(err => [fromActions.LoadAttendancesFailAction(err)])
        );
    })
  ));

  addAttendance$ =  createEffect(() => this.actions.pipe(
    ofType(fromActions.AddAttendanceAction),
    switchMap(action => {
      return this.attendancesSvc.addAttendance(action.attendance).pipe(
        map(attendance =>  fromActions.LoadAttendancesAction()),
        catchError(error => [fromActions.AddAttendanceFailedAction(error)])
      );
    })
  ));

}
