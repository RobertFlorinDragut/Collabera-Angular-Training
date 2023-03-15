import { createSelector } from '@ngrx/store';
import { Dictionary } from '@ngrx/entity';
import { TrainingManagementSystemState } from '../index';
import { selectUsersEntities, selectUsersList, selectUsersLoaded, UsersState } from './users.reducer';
import { User } from 'src/app/models/user.interface';

const selectUsersState = (state: TrainingManagementSystemState): UsersState => state.users;

export const getAllUsers = createSelector<TrainingManagementSystemState, [UsersState], User[]>(
	selectUsersState,
	selectUsersList
);


export const getUsers = 
	createSelector<TrainingManagementSystemState, [User[]], User[]>(getAllUsers, (users: User[]) =>
    users
	);

export const getUsersLoaded = createSelector<TrainingManagementSystemState, [UsersState], boolean>(
	selectUsersState,
	selectUsersLoaded
);

export const getUsersEntities = createSelector<TrainingManagementSystemState, [UsersState], Dictionary<User>>(
	selectUsersState,
	selectUsersEntities
);

export const getUserById = (props: { id: number }) =>
	createSelector<TrainingManagementSystemState, [Dictionary<User>], User>(
		getUsersEntities,
		(entities: Dictionary<User>) => entities[props.id] as User
	);

export const getEmployees = () => createSelector<TrainingManagementSystemState, User[], User[]>(
	getAllUsers,
	(entities:User[]) => entities.filter(x => x.role.toLowerCase()==='employee')
);

export const getManagers = () => createSelector<TrainingManagementSystemState, User[], User[]>(
	getAllUsers,
	(entities:User[]) => entities.filter(x => x.role.toLowerCase()==='manager')
);

export const getEmployeesForManager = (props: {managerName: string}) => createSelector<TrainingManagementSystemState, User[], User[]>(
	getAllUsers,
	(entities:User[]) => {
	var usWithManager = entities.filter(x => x.managerName!==null);
	return usWithManager.filter(x => x.managerName.toLowerCase()===props.managerName.toLowerCase())
	}
);