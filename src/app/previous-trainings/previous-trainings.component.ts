import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { filter, Observable, Subject, switchMap, takeUntil } from 'rxjs';
import { EmployeeTraining } from '../models/emplyee-training.interface';
import { Training } from '../models/training.interface';
import { TrainingManagementSystemFacade } from '../store/store.facade';

@Component({
  selector: 'app-previous-trainings',
  templateUrl: './previous-trainings.component.html',
})
export class PreviousTrainingsComponent implements OnInit, OnDestroy  {
  trainings$: Observable<Training[]>;
  appliedTrainings: EmployeeTraining[];
  employeeId: number;
  protected readonly onDestroy$: Subject<void> = new Subject<void>();

  constructor(
    private router: Router,
    private facade: TrainingManagementSystemFacade
  ) {}

  ngOnInit(): void {
    this.facade.loadTrainings();
    this.facade.loadUsers();
    this.facade.loadAppliedTrainings();
    this.employeeId = Number(localStorage.getItem('user id'));

    if(localStorage.getItem('role') === 'Employee'){
      this.facade.getAppliedTrainings().pipe(takeUntil(this.onDestroy$)).subscribe((res) => this.appliedTrainings = res.filter(x => x.employeeId === this.employeeId))
      this.trainings$ = this.facade.getTrainingsByEmployeeId(this.employeeId);
    }

  }


  goToTrainingDetails(id: number): void {
    this.router.navigate([`training/${id}`]);
  }

  getImage(trainingName: string): string{
    if(trainingName.includes('Angular'))
    return 'https://www.freecodecamp.org/news/content/images/size/w2000/2020/04/Copy-of-Copy-of-Travel-Photography-1.png';
    else if(trainingName.includes('.NET')) 
    return 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Microsoft_.NET_logo.svg/1200px-Microsoft_.NET_logo.svg.png';
    else if(trainingName.includes('React')) 
    return 'https://itsg-global.com/wp-content/uploads/2016/09/react-js-to-use-or-not-to-use.png';
    else if(trainingName.includes('Java')) 
    return 'https://www.developer.com/wp-content/uploads/2021/09/Java-tutorials.jpg';
    else return 'https://miro.medium.com/max/800/1*M_GDn6RXZSZC66kvrMHh5Q.png';
  }

  apply(trainingId: number) {
    
    const employeeTraining = {
      employeeId: this.employeeId,
      feedback: '',
      status: 'Applied',
      trainingId: trainingId
    }
    this.facade.applyToTraining(employeeTraining as EmployeeTraining);
    alert('You have successfully applied to the training!')

  }

  cancel(trainingId: number): void {
    const trainingApplicationId = this.appliedTrainings.find(x => x.employeeId === this.employeeId && x.trainingId === trainingId)?.id;
    this.facade.cancelApplicationTraining(trainingApplicationId as number);
    alert('You have successfully cancel the application to the training!');
  }

  checkApplied(trainingId: number): boolean {
    return this.appliedTrainings.filter(x => x.trainingId === trainingId && x.employeeId == this.employeeId).length > 0;
  }

  checkRejected(trainingId: number): boolean {
    return this.appliedTrainings.filter(x => x.trainingId === trainingId && x.employeeId == this.employeeId && x.status.toLowerCase() ==='rejected').length > 0;
  }

  checkApproved(trainingId: number): boolean {
    return this.appliedTrainings.filter(x => x.trainingId === trainingId && x.employeeId == this.employeeId && x.status.toLowerCase() ==='approved').length > 0;
  }

  ngOnDestroy(): void {
		this.onDestroy$.next();
		this.onDestroy$.unsubscribe();
	}

}
