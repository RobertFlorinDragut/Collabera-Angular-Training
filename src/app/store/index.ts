import { InjectionToken } from "@angular/core";
import { ActionReducerMap } from "@ngrx/store";
import { appliedTrainingsReducer, AppliedTrainingsState } from "./applied-trainings/applied-trainings.reducer";
import { attendancesReducer, EmployeeAttendancesState } from "./employee-attendance/employee-attendance.reducer";
import { EmployeeFeedbacksState, feedbackReducer } from "./employee-feedback/employee-feedback.reducer";
import { trainingsReducer, TrainingsState } from "./training/training.reducer";
import { usersReducer, UsersState } from "./users/users.reducer";

export interface TrainingManagementSystemState {
	trainings: TrainingsState;
  users: UsersState;
  appliedTrainings: AppliedTrainingsState;
  attendances: EmployeeAttendancesState;
  feedbacks: EmployeeFeedbacksState
}

export const appReducerToken = new InjectionToken<ActionReducerMap<TrainingManagementSystemState>>('Application Reducers');

export function getAppReducers(): ActionReducerMap<TrainingManagementSystemState> {
  return {
    trainings: trainingsReducer,
    users: usersReducer,
    appliedTrainings: appliedTrainingsReducer,
    attendances: attendancesReducer,
    feedbacks: feedbackReducer
  };
}