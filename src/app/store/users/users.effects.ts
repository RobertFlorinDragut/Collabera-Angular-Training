import {Injectable} from '@angular/core';
import {Actions,  createEffect,  ofType} from '@ngrx/effects';
import {catchError, map, switchMap} from 'rxjs/operators';
import { UsersService } from 'src/app/services/users.service';
import { TrainingsService } from '../../services';
import * as fromActions from './users.actions';

@Injectable({
  providedIn: 'root'
})
export class UsersEffects {

  constructor(private userSvc: UsersService, private actions: Actions) {
  }

  loadUsersEffect$ = createEffect(() =>  this.actions.pipe(
    ofType(fromActions.LoadUsersAction),
    switchMap(() => {
      return this.userSvc.getUsers()
        .pipe(
          map(users => fromActions.LoadUsersSuccessAction({users})),
          catchError(err => [fromActions.LoadUsersFailAction(err)])
        );
    })
  ));

  updateUser$ = createEffect(() =>  this.actions.pipe(
    ofType(fromActions.UpdateUserAction),
    switchMap(action => {
      return this.userSvc.updateUser(action.user)
        .pipe(
          map(users => fromActions.LoadUsersAction()),
          catchError(err => [fromActions.LoadUsersFailAction(err)])
        );
    })
  ));

  
  updateEmployeeManager$ = createEffect(() =>  this.actions.pipe(
    ofType(fromActions.UpdateManagerAction),
    switchMap(action => {
      return this.userSvc.updateManager(action.empManager)
        .pipe(
          map(users => fromActions.LoadUsersAction()),
          catchError(err => [fromActions.LoadUsersFailAction(err)])
        );
    })
  ));

  addEmployee$ = createEffect(() =>  this.actions.pipe(
    ofType(fromActions.AddUserAction),
    switchMap(action => {
      return this.userSvc.addUser(action.user)
        .pipe(
          map(users => fromActions.LoadUsersAction()),
          catchError(err => [fromActions.LoadUsersFailAction(err)])
        );
    })
  ));

  deleteEmployee$ = createEffect(() =>  this.actions.pipe(
    ofType(fromActions.DeleteEmployeeAction),
    switchMap(action => {
      return this.userSvc.deleteEmployee(action.id)
        .pipe(
          map(users => fromActions.LoadUsersAction()),
          catchError(err => [fromActions.LoadUsersFailAction(err)])
        );
    })
  ));

}
