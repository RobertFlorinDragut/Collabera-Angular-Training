import { createSelector } from '@ngrx/store';
import { Dictionary } from '@ngrx/entity';
import { TrainingManagementSystemState } from '../index';
import { EmployeeAttendancesState, selectAttendancesEntities, selectAttendancesList, selectAttendancesLoaded } from './employee-attendance.reducer';
import { EmployeeAttendance } from 'src/app/models/employee-attendance.interface';
import { getTrainningById } from '../training';
import { Training } from 'src/app/models/training.interface';

const selectAttendancesState = (state: TrainingManagementSystemState): EmployeeAttendancesState => state.attendances;

export const getAllAttendances = createSelector<TrainingManagementSystemState, [EmployeeAttendancesState], EmployeeAttendance[]>(
	selectAttendancesState,
	selectAttendancesList
);


export const getAttendances = 
	createSelector<TrainingManagementSystemState, [EmployeeAttendance[]], EmployeeAttendance[]>(getAllAttendances, (attendances: EmployeeAttendance[]) =>
    attendances
	);

export const getAttendancesLoaded = createSelector<TrainingManagementSystemState, [EmployeeAttendancesState], boolean>(
	selectAttendancesState,
	selectAttendancesLoaded
);

export const getAttendancesEntities = createSelector<TrainingManagementSystemState, [EmployeeAttendancesState], Dictionary<EmployeeAttendance>>(
	selectAttendancesState,
	selectAttendancesEntities
);

export const getAttendancesById = (props: { id: number }) =>
	createSelector<TrainingManagementSystemState, [Dictionary<EmployeeAttendance>], EmployeeAttendance>(
		getAttendancesEntities,
		(entities: Dictionary<EmployeeAttendance>) => entities[props.id] as EmployeeAttendance
	);

	export const getAttendancesByEmployeeAndTrainingId = (props: { employeeId: number, trainingId: number }) =>
	createSelector<TrainingManagementSystemState, EmployeeAttendance[], EmployeeAttendance[]>(
		getAllAttendances,
		(attendances: EmployeeAttendance[]) => attendances.filter(x => x.employeeId === props.employeeId && x.trainingId === props.trainingId) as EmployeeAttendance[]
	);

	export const getAvailableAttendanceDaysByEmployeeAndTrainingId = (props: {employeeId: number, trainingId: number}) =>
	createSelector(
		getAttendancesByEmployeeAndTrainingId({employeeId: props.employeeId, trainingId: props.trainingId}),
		getTrainningById({id: props.trainingId}),
		(attendances: EmployeeAttendance[], training: Training) => {
			if(attendances.length === 0) return training?. trainingDates;
			else
			{var attendanceDates = attendances.map(x => x.date);
			return training?.trainingDates.filter(item => attendanceDates.indexOf(item) < 0) as Date[];}
		}
	)