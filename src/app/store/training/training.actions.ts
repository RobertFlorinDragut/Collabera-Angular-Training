import { Action, createAction, props } from '@ngrx/store';
import { Training } from 'src/app/models/training.interface';

export type TrainingsActions =
  | '[Trainings] Load Trainings'
  | '[Trainings] Load Trainings Success'
  | '[Trainings] Load Trainings Failed'
  | '[Trainings] Load Training By Id'
  | '[Trainings] Load Training By Id Success'
  | '[Trainings] Load Training By Id Failed'
  | '[Trainings] Add Training'
  | '[Trainings] Add Training Failed'
  | '[Trainings] Delete Training';

export const LoadTrainingsAction = createAction<TrainingsActions>(
  '[Trainings] Load Trainings'
);

export const LoadTrainingsSuccessAction = createAction<
  TrainingsActions,
  { trainings: Training[] }
>('[Trainings] Load Trainings Success', props<{ trainings: Training[] }>());

export const LoadTrainingsFailAction = createAction<
  TrainingsActions,
  { error: Error | undefined }
>('[Trainings] Load Trainings Failed', props<{ error: Error | undefined }>());

export const LoadTrainingByIdAction = createAction<
  TrainingsActions,
  { id: number }
>('[Trainings] Load Training By Id', props<{ id: number }>());

export const LoadTrainingByIdSuccessAction = createAction<
  TrainingsActions,
  { training: Training }
>('[Trainings] Load Training By Id Success', props<{ training: Training }>());

export const LoadTrainingByIdFailAction = createAction<
  TrainingsActions,
  { error: Error | undefined }
>(
  '[Trainings] Load Training By Id Failed',
  props<{ error: Error | undefined }>()
);

export const AddTrainingFailedAction = createAction<
  TrainingsActions,
  { error: Error | undefined }
>('[Trainings] Add Training Failed', props<{ error: Error | undefined }>());

export const AddTrainingAction = createAction<
  TrainingsActions,
  { training: Training }
>(
  '[Trainings] Add Training',
  props<{
    training: Training;
  }>()
);

export const DeleteTrainingAction = createAction<
  TrainingsActions,
  { id: number }
>(
  '[Trainings] Delete Training',
  props<{ id: number }>()
);

