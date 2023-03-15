import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import { createReducer, on } from "@ngrx/store";
import { EmployeeAttendance } from "src/app/models/employee-attendance.interface";
import { User } from "src/app/models/user.interface";
import * as fromActions from './employee-attendance.actions';

export interface EmployeeAttendancesState extends EntityState<EmployeeAttendance> {
	loading: boolean;
	loaded: boolean;
}

export const selectAttendanceId = (attendance: EmployeeAttendance): number => attendance.id;

export const attendanceAdapter: EntityAdapter<EmployeeAttendance> = createEntityAdapter<EmployeeAttendance>({
	selectId: selectAttendanceId,
});


export const initialAttendanceState: EmployeeAttendancesState = attendanceAdapter.getInitialState({
	loading: false,
	loaded: false,
});

export const attendancesReducer = createReducer<EmployeeAttendancesState>(
	initialAttendanceState,
	on(fromActions.LoadAttendancesSuccessAction, (state, { attendances }) => ({
		...state,
		...attendanceAdapter.upsertMany(attendances, state),
		loading: false,
		loaded: true,
	})),
	
	on(fromActions.LoadAttendancesFailAction, (state) => ({
		...state,
		loading: false,
		loaded: false,
	}))
	
);

export const { selectAll: selectAttendancesList, selectEntities: selectAttendancesEntities } =
attendanceAdapter.getSelectors();
export const selectAttendancesLoading = (state: EmployeeAttendancesState) => state.loading;
export const selectAttendancesLoaded = (state: EmployeeAttendancesState) => state.loaded;