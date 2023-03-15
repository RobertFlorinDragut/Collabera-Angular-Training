import { createAction, props } from '@ngrx/store';
import { EmployeeTraining } from 'src/app/models/emplyee-training.interface';

export type AppliedTrainingsActions =
  | '[Applied Trainings] Load Applied Trainings'
  | '[Applied Trainings] Load Applied Trainings Success'
  | '[Applied Trainings] Load Applied Trainings Failed'
  | '[Applied Trainings] Apply To Training Failed'
  | '[Applied Trainings] Apply To Training'
  | '[Applied Trainings] Cancel Application'
  | '[Applied Trainings] Approve Training Application'
  |'[Applied Trainings] Reject Training Application';

export const LoadAppliedTrainingsAction = createAction<AppliedTrainingsActions>('[Applied Trainings] Load Applied Trainings');

export const LoadAppliedTrainingsSuccessAction = createAction<
AppliedTrainingsActions,
  { employeeTrainings: EmployeeTraining[] }
>('[Applied Trainings] Load Applied Trainings Success', props<{ employeeTrainings: EmployeeTraining[] }>());

export const LoadAppliedTrainingsFailAction = createAction<
AppliedTrainingsActions,
  { error: Error | undefined }
>('[Applied Trainings] Load Applied Trainings Failed', props<{ error: Error | undefined }>());

export const ApplyTrainingFailedAction =  createAction<AppliedTrainingsActions, { error: Error | undefined }>(
	'[Applied Trainings] Apply To Training Failed',
	props<{ error: Error | undefined }>()
);


export const ApplyToTrainingAction = createAction<AppliedTrainingsActions, { employeeTraining: EmployeeTraining }>(
	'[Applied Trainings] Apply To Training',
	props<{
		employeeTraining: EmployeeTraining
	}>()
);

export const CancelApplicationAction = createAction<AppliedTrainingsActions, { id: number }>(
	'[Applied Trainings] Cancel Application',
	props<{
		id: number
	}>()
);

export const ApproveTraining = createAction<AppliedTrainingsActions, { employeeTraining: EmployeeTraining }>(
	'[Applied Trainings] Approve Training Application',
	props<{
		employeeTraining: EmployeeTraining
	}>()
);

export const DeclineTraining = createAction<AppliedTrainingsActions, { employeeTraining: EmployeeTraining }>(
	'[Applied Trainings] Reject Training Application',
	props<{
		employeeTraining: EmployeeTraining
	}>()
);

