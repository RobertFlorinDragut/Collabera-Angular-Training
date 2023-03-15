import { createAction, props } from '@ngrx/store';
import { EmployeeFeedback } from 'src/app/models/employee-feedback.interface';

export type EmployeeFeedbackActions =
  | '[Employee Feedback] Load Feedbacks'
  | '[Employee Feedback] Load Feedbacks Success'
  | '[Employee Feedback] Load Feedbacks Failed'
  | '[Employee Feedback] Add Feedback'
  | '[Employee Feedback] Add Feedback Failed';

export const LoadFeedbacksAction = createAction<EmployeeFeedbackActions>(
    '[Employee Feedback] Load Feedbacks'
);

export const LoadFeedbacksSuccessAction = createAction<
EmployeeFeedbackActions,
  { feedbacks: EmployeeFeedback[] }
>(
    '[Employee Feedback] Load Feedbacks Success',
  props<{ feedbacks: EmployeeFeedback[] }>()
);

export const LoadFeedbacksFailAction = createAction<
EmployeeFeedbackActions,
  { error: Error | undefined }
>(
    '[Employee Feedback] Load Feedbacks Failed',
  props<{ error: Error | undefined }>()
);

export const AddFeedbackAction = createAction<
EmployeeFeedbackActions,
  { feedback: EmployeeFeedback }
>(
  '[Employee Feedback] Add Feedback',
  props<{ feedback: EmployeeFeedback }>()
);

export const AddFeedbackFailedAction = createAction<
EmployeeFeedbackActions,
  { error: Error | undefined }
>(
    '[Employee Feedback] Add Feedback Failed',
  props<{ error: Error | undefined }>()
);
