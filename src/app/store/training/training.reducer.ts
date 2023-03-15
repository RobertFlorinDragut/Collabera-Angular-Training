import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import { createReducer, on } from "@ngrx/store";
import { Training } from "src/app/models/training.interface";
import * as fromTrainingsActions from './training.actions';

export interface TrainingsState extends EntityState<Training> {
	loading: boolean;
	loaded: boolean;
}

export const selectTrainingId = (training: Training): number => training.id;

export const trainingsAdapter: EntityAdapter<Training> = createEntityAdapter<Training>({
	selectId: selectTrainingId,
});


export const initialTrainingsState: TrainingsState = trainingsAdapter.getInitialState({
	loading: false,
	loaded: false,
});

export const trainingsReducer = createReducer<TrainingsState>(
	initialTrainingsState,
	on(fromTrainingsActions.LoadTrainingsSuccessAction, (state, { trainings }) => ({
		...state,
		...trainingsAdapter.upsertMany(trainings, state),
		loading: false,
		loaded: true,
	})),
	on(fromTrainingsActions.DeleteTrainingAction, (state, { id }) => ({
		...state,
		...trainingsAdapter.removeOne(id, state),
		loading: false,
		loaded: true,
	})),
	
	on(fromTrainingsActions.LoadTrainingsFailAction, (state) => ({
		...state,
		loading: false,
		loaded: false,
	}))
	
);

export const { selectAll: selectTrainingsList, selectEntities: selectTrainingsEntities } =
	trainingsAdapter.getSelectors();
export const selectTrainingsLoading = (state: TrainingsState) => state.loading;
export const selectTrainingsLoaded = (state: TrainingsState) => state.loaded;