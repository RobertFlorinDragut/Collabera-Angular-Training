import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import { createReducer, on } from "@ngrx/store";
import { User } from "src/app/models/user.interface";
import * as fromUsersActions from './users.actions';

export interface UsersState extends EntityState<User> {
	loading: boolean;
	loaded: boolean;
}

export const selectUserId = (user: User): number => user.id;

export const usersAdapter: EntityAdapter<User> = createEntityAdapter<User>({
	selectId: selectUserId,
});


export const initialUsersState: UsersState = usersAdapter.getInitialState({
	loading: false,
	loaded: false,
});

export const usersReducer = createReducer<UsersState>(
	initialUsersState,
	on(fromUsersActions.LoadUsersSuccessAction, (state, { users }) => ({
		...state,
		...usersAdapter.upsertMany(users, state),
		loading: false,
		loaded: true,
	})),
	on(fromUsersActions.DeleteEmployeeAction, (state, { id }) => ({
		...state,
		...usersAdapter.removeOne(id, state),
		loading: false,
		loaded: true,
	})),
	
	on(fromUsersActions.LoadUsersFailAction, (state) => ({
		...state,
		loading: false,
		loaded: false,
	}))
	
);

export const { selectAll: selectUsersList, selectEntities: selectUsersEntities } =
usersAdapter.getSelectors();
export const selectUsersLoading = (state: UsersState) => state.loading;
export const selectUsersLoaded = (state: UsersState) => state.loaded;