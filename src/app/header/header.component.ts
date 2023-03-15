import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  Router,
  NavigationStart,
  Event as NavigationEvent,
} from '@angular/router';
import { TrainingStatus } from '../models/training-status.enum';
import { Training } from '../models/training.interface';
import { TrainingManagementSystemFacade } from '../store/store.facade';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  url: string = '';
  email: string | undefined = '';
  statuses = TrainingStatus;
  currentDate = new Date();

  addTrainingForm: FormGroup = this.fb.group({
    name: new FormControl('', Validators.required),
    maxNoOfParticipants: new FormControl(null, [
      Validators.required,
      Validators.min(1),
    ]),
    description: new FormControl('', Validators.required),
    trainingDates:  this.fb.array([], [Validators.required]),
    status: new FormControl('', Validators.required),
  });

  display = 'none';

  constructor(private router: Router, private fb: FormBuilder, private facade: TrainingManagementSystemFacade) {}
  
  ngOnInit(): void {
    this.email = sessionStorage.getItem('email')?.toString();
    this.router.events.subscribe((event: NavigationEvent) => {
      if (event instanceof NavigationStart) {
        this.url = event.url;
      }
    });
  }

  navigateToAboutUs() {
    this.router.navigateByUrl('/about-us');
  }

  navigateToHome() {
    this.router.navigateByUrl('/home');
  }

  navigateToContact() {
    this.router.navigateByUrl('/contact');
  }

  navigateToPortfolio() {
    this.router.navigateByUrl('/portfolio');
  }

  navigateToLogin() {
    this.router.navigateByUrl('/login');
  }

  get loggedIn(): boolean {
    return localStorage.getItem('full name') !== null ? true : false;
  }

  scheduleTraining() {
    this.router.navigateByUrl('/schedule-training');
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  navigateToUserProfile() {
    this.router.navigate(['/profile']);
  }

  navigateMyTrainings(){
    this.router.navigate(['/my-trainings']);
  }

  get userName(): string {
    return localStorage.getItem('full name') as string;
  }

  goToEmployees(){
    this.router.navigate(['/employees'])
  }

  openModal() {
    this.display = 'block';
  }

  onCloseHandled() {
    this.display = 'none';
  }

  addDate(){
    this.trainingDates.push(this.fb.control(''));
  }

  removeDate(index: number) {
    this.trainingDates.removeAt(index);
  }

  addTraining() {
   const training = this.addTrainingForm.getRawValue() as Training;
   training.currentNoOfParticipants = 0;
   this.facade.addTraining(training);
   this.display = 'none';
   alert('Training added successfully!')
  }

  navigateToMyTeam(){
    this.router.navigate(['/my-team'])
  }

  get name() {
    return this.addTrainingForm.get('name');
  }

  get maxNoOfParticipants() {
    return this.addTrainingForm.get('maxNoOfParticipants');
  }

  get description() {
    return this.addTrainingForm.get('description');
  }

  get status() {
    return this.addTrainingForm.get('status');
  }

  get trainingDates() {
    return this.addTrainingForm.get('trainingDates') as FormArray;
  }

  get hasHRRole(): boolean {
    return localStorage.getItem('role') === 'HR'
  }

  get hasEmployeeRole(): boolean {
    return localStorage.getItem('role') === 'Employee'
  }

  get hasManagerRole(): boolean {
    return localStorage.getItem('role') === 'Manager'
  }


}
