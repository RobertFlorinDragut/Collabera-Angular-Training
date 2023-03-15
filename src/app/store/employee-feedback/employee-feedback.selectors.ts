import { createSelector } from '@ngrx/store';
import { Dictionary } from '@ngrx/entity';
import { TrainingManagementSystemState } from '../index';
import { EmployeeFeedback } from 'src/app/models/employee-feedback.interface';
import { EmployeeFeedbacksState, selectFeedbacksEntities, selectFeedbacksList, selectFeedbacksLoaded } from './employee-feedback.reducer';

const selectFeedbackState = (state: TrainingManagementSystemState): EmployeeFeedbacksState => state.feedbacks;

export const getAllFeedbacks = createSelector<TrainingManagementSystemState, [EmployeeFeedbacksState], EmployeeFeedback[]>(
	selectFeedbackState,
	selectFeedbacksList
);


export const getFeedbacks = 
	createSelector<TrainingManagementSystemState, [EmployeeFeedback[]], EmployeeFeedback[]>(getAllFeedbacks, (feedbacks: EmployeeFeedback[]) =>
    feedbacks
	);

export const getFeedbacksLoaded = createSelector<TrainingManagementSystemState, [EmployeeFeedbacksState], boolean>(
	selectFeedbackState,
	selectFeedbacksLoaded
);

export const getFeedbacksEntities = createSelector<TrainingManagementSystemState, [EmployeeFeedbacksState], Dictionary<EmployeeFeedback>>(
	selectFeedbackState,
	selectFeedbacksEntities
);

export const getFeedbackById = (props: { id: number }) =>
	createSelector<TrainingManagementSystemState, [Dictionary<EmployeeFeedback>], EmployeeFeedback>(
		getFeedbacksEntities,
		(entities: Dictionary<EmployeeFeedback>) => entities[props.id] as EmployeeFeedback
	);

	export const getFeedbackByEmployeeAndTrainingId = (props: { employeeId: number, trainingId: number }) =>
	createSelector<TrainingManagementSystemState, EmployeeFeedback[], EmployeeFeedback>(
		getAllFeedbacks,
		(feedbacks: EmployeeFeedback[]) => feedbacks.find(x => x.employeeId === props.employeeId && x.trainingId === props.trainingId) as EmployeeFeedback
	);
