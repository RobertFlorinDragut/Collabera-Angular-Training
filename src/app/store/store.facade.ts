import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Training } from '../models/training.interface';
import { TrainingManagementSystemState } from './index';
import * as fromTrainingSelectors from './training/training.selectors';
import * as fromAppliedrainingSelectors from './applied-trainings/applied-trainings.selectors';
import * as fromTrainingActions from './training/training.actions';
import * as fromAppliedTrainingsActions from './applied-trainings/applied-trainings.actions';
import * as fromUsersActions from './users/users.actions';
import * as fromUsersSelectors from './users/users.selectors';
import { EmployeeTraining } from '../models/emplyee-training.interface';
import { User } from '../models/user.interface';
import * as fromAttendancesActions from './employee-attendance/employee-attendance.actions';
import { EmployeeAttendance } from '../models/employee-attendance.interface';
import * as fromAttendancesSelectors from './employee-attendance/employee-attendance.selectors';
import * as fromFeedbackSelectors from './employee-feedback/employee-feedback.selectors';
import * as fromFeedbackActions from './employee-feedback/employee-feedback.actions';
import { EmployeeFeedback } from '../models/employee-feedback.interface';
import { EmployeeManager } from '../models/employee-manager.interface';

@Injectable()
export class TrainingManagementSystemFacade {
  constructor(private store$: Store<TrainingManagementSystemState>) {}

  getTrainingById(id: number): Observable<Training> {
    return this.store$.pipe(
      select(fromTrainingSelectors.getTrainningById({ id }))
    );
  }

  loadTrainingById(id: number): void {
    this.store$.dispatch(fromTrainingActions.LoadTrainingByIdAction({ id }));
  }

  loadTrainings(): void {
    this.store$.dispatch(fromTrainingActions.LoadTrainingsAction());
  }

  getTrainings(): Observable<Training[]> {
    return this.store$.pipe(select(fromTrainingSelectors.getAllTrainings));
  }

  addTraining(training: Training): void {
    this.store$.dispatch(fromTrainingActions.AddTrainingAction({ training }));
  }

  addUser(user: User): void {
    this.store$.dispatch(fromUsersActions.AddUserAction({user}));
  }

  loadAppliedTrainings(): void {
    this.store$.dispatch(
      fromAppliedTrainingsActions.LoadAppliedTrainingsAction()
    );
  }

  loadUsers(): void {
    this.store$.dispatch(fromUsersActions.LoadUsersAction());
  }

  getUsers(): Observable<User[]> {
    return this.store$.pipe(select(fromUsersSelectors.getAllUsers));
  }

  getUserById(id: number): Observable<User> {
    return this.store$.pipe(select(fromUsersSelectors.getUserById({ id })));
  }

  updateUser(user: User): void {
    this.store$.dispatch(fromUsersActions.UpdateUserAction({ user }));
  }

  applyToTraining(employeeTraining: EmployeeTraining): void {
    this.store$.dispatch(
      fromAppliedTrainingsActions.ApplyToTrainingAction({ employeeTraining })
    );
  }

  approveTraining(employeeTraining: EmployeeTraining): void {
    this.store$.dispatch(
      fromAppliedTrainingsActions.ApproveTraining({ employeeTraining })
    );
  }

  getAppliedTrainings(): Observable<EmployeeTraining[]> {
    return this.store$.pipe(
      select(fromAppliedrainingSelectors.getAllAppliedTraininigs)
    );
  }

  cancelApplicationTraining(id: number): void {
    this.store$.dispatch(
      fromAppliedTrainingsActions.CancelApplicationAction({ id })
    );
  }

  getAppliedTrainingsForTraining(id: number): Observable<EmployeeTraining[]> {
    return this.store$.pipe(
      select(fromAppliedrainingSelectors.getApplicationsByTrainingId({ id }))
    );
  }

  getApprovedEmployeesForTraining(trainingId: number): Observable<User[]> {
    return this.store$.pipe(
      select(
        fromAppliedrainingSelectors.getApprovedEmployeesForTraining({
          trainingId,
        })
      )
    );
  }

  getRejectedEmployeesForTraining(trainingId: number): Observable<User[]> {
    return this.store$.pipe(
      select(
        fromAppliedrainingSelectors.getRejectedEmployeesForTraining({
          trainingId,
        })
      )
    );
  }

  getPendingEmployeesForTraining(trainingId: number): Observable<User[]> {
    return this.store$.pipe(
      select(
        fromAppliedrainingSelectors.getPendingEmployeesForTraining({
          trainingId,
        })
      )
    );
  }

  getApprovedApplicationsForTrainingAndManager(
    trainingId: number,
    managerId: number
  ): Observable<User[]> {
    return this.store$.pipe(
      select(
        fromAppliedrainingSelectors.getApprovedEmployeesByTrainingAndManagerId({
          trainingId,
          managerId,
        })
      )
    );
  }

  getRejectedApplicationsForTrainingAndManager(
    trainingId: number,
    managerId: number
  ): Observable<User[]> {
    return this.store$.pipe(
      select(
        fromAppliedrainingSelectors.getRejectedEmployeesByTrainingAndManagerId({
          trainingId,
          managerId,
        })
      )
    );
  }

  getPendingApplicationsForTrainingAndManager(
    trainingId: number,
    managerId: number
  ): Observable<User[]> {
    return this.store$.pipe(
      select(
        fromAppliedrainingSelectors.getPendingEmployeesByTrainingAndManagerId({
          trainingId,
          managerId,
        })
      )
    );
  }

  rejectTraining(employeeTraining: EmployeeTraining): void {
    this.store$.dispatch(
      fromAppliedTrainingsActions.DeclineTraining({ employeeTraining })
    );
  }

  getEmployeeTrainingByEmployeeAndTrainingId(
    employeeId: number,
    trainingId: number
  ): Observable<EmployeeTraining> {
    return this.store$.pipe(
      select(
        fromAppliedrainingSelectors.getEmployeeTrainingByEmployeeIdAndTrainingId(
          { employeeId, trainingId }
        )
      )
    );
  }

  loadAttendances(): void {
    this.store$.dispatch(fromAttendancesActions.LoadAttendancesAction());
  }

  getAttendances(): Observable<EmployeeAttendance[]> {
    return this.store$.pipe(select(fromAttendancesSelectors.getAllAttendances));
  }

  addAttendance(attendance: EmployeeAttendance): void {
    this.store$.dispatch(
      fromAttendancesActions.AddAttendanceAction({ attendance })
    );
  }

  getAttendancesByEmployeeAndTrainingId(
    employeeId: number,
    trainingId: number
  ): Observable<EmployeeAttendance[]> {
    return this.store$.pipe(
      select(
        fromAttendancesSelectors.getAttendancesByEmployeeAndTrainingId({
          employeeId,
          trainingId,
        })
      )
    );
  }

  getAvailableAttendanceDaysByEmployeeAndTrainingId(
    employeeId: number,
    trainingId: number
  ): Observable<Date[]> {
    return this.store$.pipe(
      select(
        fromAttendancesSelectors.getAvailableAttendanceDaysByEmployeeAndTrainingId(
          { employeeId, trainingId }
        )
      )
    );
  }

  loadFeedbacks(): void {
    this.store$.dispatch(fromFeedbackActions.LoadFeedbacksAction());
  }

  getFeedbacks(): Observable<EmployeeFeedback[]> {
    return this.store$.pipe(select(fromFeedbackSelectors.getAllFeedbacks));
  }

  getFeedbackByEmployeeAndTrainingId(
    employeeId: number,
    trainingId: number
  ): Observable<EmployeeFeedback> {
    return this.store$.pipe(
      select(
        fromFeedbackSelectors.getFeedbackByEmployeeAndTrainingId({
          employeeId,
          trainingId,
        })
      )
    );
  }

  addFeedback(feedback: EmployeeFeedback): void {
    this.store$.dispatch(
      fromFeedbackActions.AddFeedbackAction({ feedback })
    );
  }

  getFutureTrainings():Observable<Training[]>{
    return this.store$.pipe(
      select(
        fromTrainingSelectors.getFutureTrainings()
      )
    );
  }

  getTrainingsByEmployeeId(employeeId: number): Observable<Training[]>{
    return this.store$.pipe(
      select(
        fromTrainingSelectors.getTrainingsByEmployeeId({employeeId})
      )
    );
  }

  getEmployees():Observable<User[]>{
    return this.store$.pipe(
      select(
        fromUsersSelectors.getEmployees()
      )
    );
  }

  getManagers():Observable<User[]>{
    return this.store$.pipe(
      select(
        fromUsersSelectors.getManagers()
      )
    );
  }

  deleteEmployee(id: number): void {
    this.store$.dispatch(
      fromUsersActions.DeleteEmployeeAction({ id })
    );
  }

  
  updateEmployeeManager(empManager: EmployeeManager): void {
    this.store$.dispatch(
      fromUsersActions.UpdateManagerAction({ empManager })
    );
  }

  getFeedbackByManagerEmployeeAndTrainingId(managerId: number, employeeId: number, trainingId: number):Observable<EmployeeTraining>{
    return this.store$.pipe(
      select(
        fromAppliedrainingSelectors.getApplicationByTrainingEmployeeAndManagerId({managerId, employeeId, trainingId})
      )
    );
  }
  
  deleteTraining(id: number){
    this.store$.dispatch(fromTrainingActions.DeleteTrainingAction({id}));
  }

  getEmployeesForManager(managerName: string){
    return this.store$.pipe(
      select(
        fromUsersSelectors.getEmployeesForManager({managerName})
      )
    );
  }

}
