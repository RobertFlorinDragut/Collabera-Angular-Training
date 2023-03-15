import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject, take, takeUntil } from 'rxjs';
import { EmployeeAttendance } from 'src/app/models/employee-attendance.interface';
import { EmployeeFeedback } from 'src/app/models/employee-feedback.interface';
import { User } from 'src/app/models/user.interface';
import { TrainingManagementSystemFacade } from 'src/app/store/store.facade';

@Component({
  selector: 'app-training-hr',
  templateUrl: './training-hr.component.html',
  styleUrls: ['./training-hr.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrainingHRComponent implements OnInit, OnDestroy {
  @Input() trainingId: number;
  approvedParticipants$: Observable<User[]>;
  pendingParticipants$: Observable<User[]>;
  rejectedParticipants$: Observable<User[]>;
  displaySeeAttendance = 'none';
  employeeAttendances$: Observable<EmployeeAttendance[]>;
  employeeFeedback$: Observable<EmployeeFeedback>;

  displaySeeApprovedFeedback = 'none';

  protected readonly onDestroy$: Subject<void> = new Subject<void>();

  constructor(
    private router: Router,
    private facade: TrainingManagementSystemFacade,
  ) {}

  ngOnInit(): void {
    this.facade.loadTrainings();
    this.facade.loadAppliedTrainings();
    this.facade.loadUsers();
    this.facade.loadAttendances();
    this.facade.loadFeedbacks();

    this.pendingParticipants$ = this.facade.getPendingEmployeesForTraining(this.trainingId);

    this.rejectedParticipants$ = this.facade.getRejectedEmployeesForTraining(this.trainingId);

    this.approvedParticipants$ = this.facade.getApprovedEmployeesForTraining(this.trainingId);
   
  }

 

  onCloseHandled() {
    this.displaySeeAttendance = 'none';
    this.displaySeeApprovedFeedback = 'none';
  }

  openSeeAttendanceModal(employeeId: number){
    this.displaySeeAttendance = 'block';
    this.employeeAttendances$ = this.facade.getAttendancesByEmployeeAndTrainingId(employeeId, this.trainingId);
  }

  openSeeApprovedFeedbackModal(employeeId: number){
    this.displaySeeApprovedFeedback = 'block';
    this.employeeFeedback$ = this.facade.getFeedbackByEmployeeAndTrainingId(employeeId, this.trainingId);
  }

  checkHasAttendances(empAttendance: EmployeeAttendance[]){
    return empAttendance?.length > 0
  }

  ngOnDestroy(): void {
		this.onDestroy$.next();
		this.onDestroy$.unsubscribe();
	}
}
