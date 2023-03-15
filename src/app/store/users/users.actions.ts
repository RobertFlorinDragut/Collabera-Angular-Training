import { createAction, props } from '@ngrx/store';
import { EmployeeManager } from 'src/app/models/employee-manager.interface';
import { User } from 'src/app/models/user.interface';

export type UsersActions =
  | '[Users] Load Users'
  | '[Users] Load Users Success'
  | '[Users] Load Users Failed'
  | '[Users] Update User'
  | '[Users] Delete Employee'
  | '[Users] Add User'
  | '[Users] Update Manager';

export const LoadUsersAction = createAction<UsersActions>('[Users] Load Users');

export const LoadUsersSuccessAction = createAction<
  UsersActions,
  { users: User[] }
>('[Users] Load Users Success', props<{ users: User[] }>());

export const LoadUsersFailAction = createAction<
  UsersActions,
  { error: Error | undefined }
>('[Users] Load Users Failed', props<{ error: Error | undefined }>());

export const UpdateUserAction = createAction<
  UsersActions,
  { user: User }
>('[Users] Update User', props<{ user: User }>());

export const UpdateManagerAction = createAction<
  UsersActions,
  { empManager: EmployeeManager }
>('[Users] Update Manager', props<{ empManager: EmployeeManager }>());


export const AddUserAction = createAction<
  UsersActions,
  { user: User }
>('[Users] Add User', props<{ user: User }>());


export const DeleteEmployeeAction = createAction<
UsersActions,
{ id: number }
>('[Users] Delete Employee', props<{ id: number }>());

