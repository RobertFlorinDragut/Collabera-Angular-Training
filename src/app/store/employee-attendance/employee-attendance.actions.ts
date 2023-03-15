import { createAction, props } from '@ngrx/store';
import { EmployeeAttendance } from 'src/app/models/employee-attendance.interface';

export type EmployeeAttendanceActions =
  | '[Employee Attendance] Load Attendances'
  | '[Employee Attendance] Load Attendances Success'
  | '[Employee Attendance] Load Attendances Failed'
  | '[Employee Attendance] Add Attendance'
  | '[Employee Attendance] Add Attendance Failed';

export const LoadAttendancesAction = createAction<EmployeeAttendanceActions>(
  '[Employee Attendance] Load Attendances'
);

export const LoadAttendancesSuccessAction = createAction<
  EmployeeAttendanceActions,
  { attendances: EmployeeAttendance[] }
>(
  '[Employee Attendance] Load Attendances Success',
  props<{ attendances: EmployeeAttendance[] }>()
);

export const LoadAttendancesFailAction = createAction<
  EmployeeAttendanceActions,
  { error: Error | undefined }
>(
  '[Employee Attendance] Load Attendances Failed',
  props<{ error: Error | undefined }>()
);

export const AddAttendanceAction = createAction<
  EmployeeAttendanceActions,
  { attendance: EmployeeAttendance }
>(
  '[Employee Attendance] Add Attendance',
  props<{ attendance: EmployeeAttendance }>()
);

export const AddAttendanceFailedAction = createAction<
  EmployeeAttendanceActions,
  { error: Error | undefined }
>(
  '[Employee Attendance] Add Attendance Failed',
  props<{ error: Error | undefined }>()
);
