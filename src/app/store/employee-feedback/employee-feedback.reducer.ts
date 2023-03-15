import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import { createReducer, on } from "@ngrx/store";
import { EmployeeFeedback } from "src/app/models/employee-feedback.interface";
import * as fromActions from './employee-feedback.actions';

export interface EmployeeFeedbacksState extends EntityState<EmployeeFeedback> {
	loading: boolean;
	loaded: boolean;
}

export const selectFeedbackId = (feedback: EmployeeFeedback): number => feedback.id;

export const feedbackAdapter: EntityAdapter<EmployeeFeedback> = createEntityAdapter<EmployeeFeedback>({
	selectId: selectFeedbackId,
});


export const initialFeedbackState: EmployeeFeedbacksState = feedbackAdapter.getInitialState({
	loading: false,
	loaded: false,
});

export const feedbackReducer = createReducer<EmployeeFeedbacksState>(
	initialFeedbackState,
	on(fromActions.LoadFeedbacksSuccessAction, (state, { feedbacks }) => ({
		...state,
		...feedbackAdapter.upsertMany(feedbacks, state),
		loading: false,
		loaded: true,
	})),
	
	on(fromActions.LoadFeedbacksFailAction, (state) => ({
		...state,
		loading: false,
		loaded: false,
	}))
	
);

export const { selectAll: selectFeedbacksList, selectEntities: selectFeedbacksEntities } =
feedbackAdapter.getSelectors();
export const selectFeedbacksLoading = (state: EmployeeFeedbacksState) => state.loading;
export const selectFeedbacksLoaded = (state: EmployeeFeedbacksState) => state.loaded;