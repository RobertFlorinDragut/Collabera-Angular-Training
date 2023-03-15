import { createSelector } from '@ngrx/store';
import { Dictionary } from '@ngrx/entity';
import { TrainingManagementSystemState } from '../index';
import { AppliedTrainingsState, selectAppliedTrainingsEntities, selectAppliedTrainingsList, selectAppliedTrainingsLoaded } from './applied-trainings.reducer';
import { EmployeeTraining } from 'src/app/models/emplyee-training.interface';
import { getAllUsers, getUsers } from '../users/users.selectors';
import { User } from 'src/app/models/user.interface';

const selectAppliedTraininigsState = (state: TrainingManagementSystemState): AppliedTrainingsState => state.appliedTrainings;

export const getAllAppliedTraininigs = createSelector<TrainingManagementSystemState, [AppliedTrainingsState], EmployeeTraining[]>(
	selectAppliedTraininigsState,
	selectAppliedTrainingsList
);


export const getAppliedTraininigs = 
	createSelector<TrainingManagementSystemState, [EmployeeTraining[]], EmployeeTraining[]>(getAllAppliedTraininigs, (employeeTrainings: EmployeeTraining[]) =>
    employeeTrainings
	);

export const getAppliedTraininigsLoaded = createSelector<TrainingManagementSystemState, [AppliedTrainingsState], boolean>(
	selectAppliedTraininigsState,
	selectAppliedTrainingsLoaded
);

export const getAppliedTraininigsEntities = createSelector<TrainingManagementSystemState, [AppliedTrainingsState], Dictionary<EmployeeTraining>>(
	selectAppliedTraininigsState,
	selectAppliedTrainingsEntities
);

export const getAppliedTraininigById = (props: { id: number }) =>
	createSelector<TrainingManagementSystemState, [Dictionary<EmployeeTraining>], EmployeeTraining>(
		getAppliedTraininigsEntities,
		(entities: Dictionary<EmployeeTraining>) => entities[props.id] as EmployeeTraining
	);

	export const getApplicationsByTrainingId = (props: { id: number }) => createSelector<TrainingManagementSystemState, EmployeeTraining[], EmployeeTraining[]>(
		getAppliedTraininigs,
		(entities: EmployeeTraining[]) => entities.filter(x => x.trainingId === props.id)
	);

	export const getApplicationsByEmployeeId = (props: {employeeId: number}) => createSelector<TrainingManagementSystemState, EmployeeTraining[], EmployeeTraining[]>(
		getAppliedTraininigs,
		(entities: EmployeeTraining[]) => entities.filter(x => x.employeeId === props.employeeId)
	);

	export const getRejectedApplicationsByTrainingId = (props: { id: number }) => createSelector<TrainingManagementSystemState, EmployeeTraining[], EmployeeTraining[]>(
		getAppliedTraininigs,
		(entities: EmployeeTraining[]) => entities.filter(x => x.trainingId === props.id && x.status.toLowerCase()==='rejected')
	);

	export const getApprovedApplicationsByTrainingId = (props: { id: number }) => createSelector<TrainingManagementSystemState, EmployeeTraining[], EmployeeTraining[]>(
		getAppliedTraininigs,
		(entities: EmployeeTraining[]) => entities.filter(x => x.trainingId === props.id && x.status.toLowerCase()==='approved')
	);

	export const getAppliedApplicationsByTrainingId = (props: { id: number }) => createSelector<TrainingManagementSystemState, EmployeeTraining[], EmployeeTraining[]>(
		getAppliedTraininigs,
		(entities: EmployeeTraining[]) => entities.filter(x => x.trainingId === props.id && x.status.toLowerCase()==='applied')
	);

	export const getApprovedEmployeesByTrainingIdAndManagerId = (props: { trainingId: number; managerId: number }) => createSelector<TrainingManagementSystemState, EmployeeTraining[], EmployeeTraining[]>(
		getAppliedTraininigs,
		(entities: EmployeeTraining[]) => entities.filter(x => x.trainingId === props.trainingId && x.managerId == props.managerId && x.status.toLowerCase()==='approved')
	);

	export const getPendingEmployeesByTrainingIdAndManagerId = (props: { trainingId: number; managerId: number }) => createSelector<TrainingManagementSystemState, EmployeeTraining[], EmployeeTraining[]>(
		getAppliedTraininigs,
		(entities: EmployeeTraining[]) => entities.filter(x => x.trainingId === props.trainingId && x.managerId == props.managerId &&  x.status.toLowerCase()==='applied')
	);

	export const getRejectedEmployeesByTrainingIdAndManagerId = (props: { trainingId: number; managerId: number }) => createSelector<TrainingManagementSystemState, EmployeeTraining[], EmployeeTraining[]>(
		getAppliedTraininigs,
		(entities: EmployeeTraining[]) => entities.filter(x => x.trainingId === props.trainingId && x.managerId == props.managerId && x.status.toLowerCase()==='rejected')
	);

	export const getApprovedEmployeesForTraining = (props: {trainingId: number}) => createSelector(
		getApprovedApplicationsByTrainingId({id: props.trainingId}),
		getUsers,
		(applications: EmployeeTraining[], users: User[]) => {
			var newUsers: User[] = [];
			var employeesIds = applications.map(x => x.employeeId);
			employeesIds.forEach(emp => {
				var user = users.find(x => x.id === emp);
				newUsers.push(user as User);
			});
			return newUsers;
		}
	)

	export const getRejectedEmployeesForTraining = (props: {trainingId: number}) => createSelector(
		getRejectedApplicationsByTrainingId({id: props.trainingId}),
		getUsers,
		(applications: EmployeeTraining[], users: User[]) => {
			var newUsers: User[] = [];
			var employeesIds = applications.map(x => x.employeeId);
			employeesIds.forEach(emp => {
				var user = users.find(x => x.id === emp);
				newUsers.push(user as User);
			});
			return newUsers;
		}
	)

	export const getPendingEmployeesForTraining = (props: {trainingId: number}) => createSelector(
		getAppliedApplicationsByTrainingId({id: props.trainingId}),
		getUsers,
		(applications: EmployeeTraining[], users: User[]) => {
			var newUsers: User[] = [];
			var employeesIds = applications.map(x => x.employeeId);
			employeesIds.forEach(emp => {
				var user = users.find(x => x.id === emp);
				newUsers.push(user as User);
			});
			return newUsers;
		}
	)

	export const getApprovedEmployeesByTrainingAndManagerId = (props: {trainingId: number, managerId:number}) => createSelector(
		getApprovedEmployeesByTrainingIdAndManagerId({trainingId:props.trainingId, managerId:props.managerId}),
		getUsers,
		(applications: EmployeeTraining[], users: User[]) => {
			var newUsers: User[] = [];
			var employeesIds = applications.map(x => x.employeeId);
			employeesIds.forEach(emp => {
				var user = users.find(x => x.id === emp);
				newUsers.push(user as User);
			});
			return newUsers;
		}
	)

	export const getPendingEmployeesByTrainingAndManagerId = (props: {trainingId: number, managerId:number}) => createSelector(
		getPendingEmployeesByTrainingIdAndManagerId({trainingId:props.trainingId, managerId:props.managerId}),
		getUsers,
		(applications: EmployeeTraining[], users: User[]) => {
			var newUsers: User[] = [];
			var employeesIds = applications.map(x => x.employeeId);
			employeesIds.forEach(emp => {
				var user = users.find(x => x.id === emp);
				newUsers.push(user as User);
			});
			return newUsers;
		}
	)

	export const getRejectedEmployeesByTrainingAndManagerId = (props: {trainingId: number, managerId:number}) => createSelector(
		getRejectedEmployeesByTrainingIdAndManagerId({trainingId:props.trainingId, managerId:props.managerId}),
		getUsers,
		(applications: EmployeeTraining[], users: User[]) => {
			var newUsers: User[] = [];
			var employeesIds = applications.map(x => x.employeeId);
			employeesIds.forEach(emp => {
				var user = users.find(x => x.id === emp);
				newUsers.push(user as User);
			});
			return newUsers;
		}
	)

	export const getEmployeeTrainingByEmployeeIdAndTrainingId =(props: {employeeId: number, trainingId:number}) => createSelector(
		getAppliedTraininigs,
		(entities: EmployeeTraining[]) => entities.find(x => x.employeeId === props.employeeId && x.trainingId === props.trainingId) as EmployeeTraining
	)

	export const getApplicationByTrainingEmployeeAndManagerId =  (props: {managerId: number, employeeId: number, trainingId:number}) => createSelector(
		getAppliedTraininigs,
		(entities: EmployeeTraining[]) => entities.find(x => x.employeeId === props.employeeId && x.trainingId === props.trainingId && x.managerId === props.managerId) as EmployeeTraining
	)