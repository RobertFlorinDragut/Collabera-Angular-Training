import { formatDate } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subject, take, takeUntil } from 'rxjs';
import { EmployeeAttendance } from 'src/app/models/employee-attendance.interface';
import { EmployeeFeedback } from 'src/app/models/employee-feedback.interface';
import { EmployeeTraining } from 'src/app/models/emplyee-training.interface';
import { User } from 'src/app/models/user.interface';
import { TrainingManagementSystemFacade } from 'src/app/store/store.facade';

@Component({
  selector: 'app-training-manager',
  templateUrl: './training-manager.component.html',
  styleUrls: ['./training-manager.component.scss']
})
export class TrainingManagerComponent implements OnInit {
  @Input() trainingId: number;
  @Input() trainingDates: Date[];

  managerId: number;
  participantId: number;

  approvedParticipants$: Observable<User[]>;
  pendingParticipants$: Observable<User[]>;
  rejectedParticipants$: Observable<User[]>;
  displaySeeAttendance = 'none';
  displaySeeEmployeeFeedback = 'none';
  displaySeeManagerFeedback = 'none';
  employeeAttendances$: Observable<EmployeeAttendance[]>;
  employeeFeedback$: Observable<EmployeeFeedback>;
  managerFeedback$: Observable<EmployeeTraining>;
  showReject = true;

  protected readonly onDestroy$: Subject<void> = new Subject<void>();

  display = 'none';

  rejectForm: FormGroup = this.fb.group({
    feedback: new FormControl('', Validators.required),
  });

  constructor(private fb: FormBuilder, private router: Router, 
    private facade: TrainingManagementSystemFacade
    ) {}

  ngOnInit(): void {
    this.managerId = Number(localStorage.getItem('user id'));
    this.facade.loadTrainings();
    this.facade.loadAppliedTrainings();
    this.facade.loadUsers();
    this.facade.loadAttendances();
    this.facade.loadFeedbacks();

    this.pendingParticipants$ = this.facade.getPendingApplicationsForTrainingAndManager(this.trainingId, this.managerId);

    this.rejectedParticipants$ = this.facade.getRejectedApplicationsForTrainingAndManager(this.trainingId, this.managerId);

    this.approvedParticipants$ = this.facade.getApprovedApplicationsForTrainingAndManager(this.trainingId, this.managerId);

    this.trainingDates.forEach(date => {
      const currentDate = formatDate(new Date(), 'yyyy-MM-dd hh:mm:ssZZZZZ', 'en_US')
      if(date.toString() < currentDate){
        this.showReject = false;
      }})
  }

  openModal(employeeId: number) {
    this.participantId = employeeId;
    this.display = 'block';
  }

  onCloseHandled() {
    this.display = 'none';
    this.displaySeeAttendance = 'none';
    this.displaySeeEmployeeFeedback = 'none';
    this.displaySeeManagerFeedback = 'none';
  }

  approveTraining(employeeId: number): void{
    var empTraining = {
      employeeId: employeeId, 
      trainingId: this.trainingId,
      status: 'Approved',
      feedback: ''
    };
    this.facade.approveTraining(empTraining as EmployeeTraining);
    alert('Approved training!')
  }

  reject(): void{
    var empTraining = {
      employeeId: this.participantId, 
      trainingId: this.trainingId,
      status: 'Rejected',
      feedback: this.rejectForm.getRawValue().feedback as string
    };
    this.facade.rejectTraining(empTraining as EmployeeTraining);
    this.display = 'none';

    alert('Participation declined!')
  }

  checkHasAttendances(empAttendance: EmployeeAttendance[]){
    return empAttendance?.length > 0
  }

  openSeeAttendanceModal(employeeId: number){
    this.displaySeeAttendance = 'block';
    this.employeeAttendances$ = this.facade.getAttendancesByEmployeeAndTrainingId(employeeId, this.trainingId);
  }

  openSeeEmployeeFeedbackModal(employeeId: number){
    this.displaySeeEmployeeFeedback = 'block';
    this.employeeFeedback$ = this.facade.getFeedbackByEmployeeAndTrainingId(employeeId, this.trainingId);
  }

  openSeeManagerFeedbackModal(employeeId: number){
    this.displaySeeManagerFeedback = 'block';
    this.managerFeedback$ = this.facade.getFeedbackByManagerEmployeeAndTrainingId(this.managerId, employeeId, this.trainingId);
  }

  goToEmployeeProfile(employeeId: number | undefined) {
    this.router.navigate([`employee/${employeeId}`])
  }

  get feedback() {
    return this.rejectForm.controls['feedback'];
  }
}
