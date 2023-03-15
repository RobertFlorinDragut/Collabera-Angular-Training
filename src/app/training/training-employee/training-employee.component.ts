import { formatDate } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject, take, takeUntil, tap } from 'rxjs';
import { EmployeeAttendance } from 'src/app/models/employee-attendance.interface';
import { EmployeeFeedback } from 'src/app/models/employee-feedback.interface';
import { EmployeeTraining } from 'src/app/models/emplyee-training.interface';
import { Training } from 'src/app/models/training.interface';
import { TrainingManagementSystemFacade } from 'src/app/store/store.facade';

@Component({
  selector: 'app-training-employee',
  templateUrl: './training-employee.component.html',
  styleUrls: ['./training-employee.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrainingEmployeeComponent implements OnInit, OnDestroy {
  @Input() trainingId: number;
  @Input() trainingDates: Date[];

  training$: Observable<Training>;

  employeeId: number;

  displayAddAttendance = 'none';
  displaySeeAttendance = 'none';
  displayAddFeedback = 'none';
  displaySeeFeedback = 'none';

  employeeTraining$: Observable<EmployeeTraining>;
  availableAttendanceDates$: Observable<Date[]>;
  employeeAttendances$: Observable<EmployeeAttendance[]>;
  employeeFeedback$: Observable<EmployeeFeedback>;

  attendanceForm: FormGroup = this.fb.group({
    date: new FormControl('', Validators.required),
    attendance: new FormControl('',Validators.required),
  });

  feedbackForm: FormGroup = this.fb.group({
    feedback: new FormControl('', Validators.required),
  });

  protected readonly onDestroy$: Subject<void> = new Subject<void>();

  constructor(
    private router: Router,
    private facade: TrainingManagementSystemFacade,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.trainingId = Number(this.route.snapshot.paramMap.get('id'));
    this.employeeId = Number(localStorage.getItem('user id'));
    this.facade.loadTrainings();
    this.facade.loadAppliedTrainings();
    this.facade.loadUsers();
    this.facade.loadAttendances();
    this.facade.loadFeedbacks();

    this.employeeTraining$ = this.facade.getEmployeeTrainingByEmployeeAndTrainingId(this.employeeId, this.trainingId);
    this.training$ = this.facade.getTrainingById(this.trainingId);
    this.availableAttendanceDates$ = this.facade.getAvailableAttendanceDaysByEmployeeAndTrainingId(this.employeeId, this.trainingId);
    this.employeeAttendances$ = this.facade.getAttendancesByEmployeeAndTrainingId(this.employeeId, this.trainingId);
    this.employeeFeedback$ = this.facade.getFeedbackByEmployeeAndTrainingId(this.employeeId, this.trainingId);
  }

  openAttendanceModal() {
    this.displayAddAttendance = 'block';
    this.attendanceForm.reset();
  }

  onCloseHandled() {
    this.displayAddAttendance = 'none';
    this.displaySeeAttendance = 'none';
    this.displayAddFeedback = 'none';
    this.displaySeeFeedback = 'none';
  }

  openSeeAttendanceModal(){
    this.displaySeeAttendance = 'block';
  }

  openSeeFeedbackModal(){
    this.displaySeeFeedback = 'block';
  }


  addAttendance(){
    var attendance = this.attendanceForm.getRawValue();
    const payload = {
      employeeId: this.employeeId,
      trainingId: this.trainingId,
      date: attendance.date,
      attended: attendance.attendance === 'yes' ? true : false
    }

    this.facade.addAttendance(payload as EmployeeAttendance);
    this.displayAddAttendance = 'none';

    alert('Attendance added!');
  }

  addFeedbackModal(){
    var showFeedbackModal = false;
    var maxDate = this.trainingDates?.reduce((max, date) => date > max ? date : max, this.trainingDates[0]);
   
      const currentDate = formatDate(new Date(), 'yyyy-MM-dd', 'en_US')
      if(formatDate(maxDate, 'yyyy-MM-dd', 'en_US') === currentDate){
        showFeedbackModal = true;
      }
      if(showFeedbackModal){
    this.displayAddFeedback = 'block';}
    else{
      alert('You can submit your feedback on the last day of the training');
    }
  }

  addFeedback(){
    const formValue = this.feedbackForm.getRawValue();
    const payload = {
      employeeId: this.employeeId,
      trainingId: this.trainingId,
      status: 'Completed',
      feedback: formValue.feedback
    }

    this.facade.addFeedback(payload as EmployeeFeedback);
    this.displayAddFeedback = 'none';

    alert('Feedback submitted!');
  }

  get attendance() {
    return this.attendanceForm.controls['attendance'];
  }

  get date() {
    return this.attendanceForm.controls['date'];
  }

  get feedback() {
    return this.feedbackForm.controls['feedback'];
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.unsubscribe();
  }
}
