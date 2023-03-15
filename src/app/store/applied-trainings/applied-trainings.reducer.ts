import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import { createReducer, on } from "@ngrx/store";
import { EmployeeTraining } from "src/app/models/emplyee-training.interface";
import * as fromActions from './applied-trainings.actions';

export interface AppliedTrainingsState extends EntityState<EmployeeTraining> {
	loading: boolean;
	loaded: boolean;
}

export const selectAppliedTrainingId = (emplTr: EmployeeTraining): number => emplTr.id;

export const appliedTrainingsAdapter: EntityAdapter<EmployeeTraining> = createEntityAdapter<EmployeeTraining>({
	selectId: selectAppliedTrainingId,
});


export const initialAppliedTrainingsState: AppliedTrainingsState = appliedTrainingsAdapter.getInitialState({
	loading: false,
	loaded: false,
});

export const appliedTrainingsReducer = createReducer<AppliedTrainingsState>(
	initialAppliedTrainingsState,
	on(fromActions.LoadAppliedTrainingsSuccessAction, (state, { employeeTrainings }) => ({
		...state,
		...appliedTrainingsAdapter.removeAll(state),
		...appliedTrainingsAdapter.upsertMany(employeeTrainings, state),
		loading: false,
		loaded: true,
	})),
	
	on(fromActions.LoadAppliedTrainingsFailAction, (state) => ({
		...state,
		loading: false,
		loaded: false,
	})),
	on(fromActions.CancelApplicationAction, (state, { id }) => ({
		...state,
		...appliedTrainingsAdapter.removeOne(id,state),
		loading: false,
		loaded: true,
	})),
	
);

export const { selectAll: selectAppliedTrainingsList, selectEntities: selectAppliedTrainingsEntities } =
appliedTrainingsAdapter.getSelectors();
export const selectAppliedTrainingsLoading = (state: AppliedTrainingsState) => state.loading;
export const selectAppliedTrainingsLoaded = (state: AppliedTrainingsState) => state.loaded;