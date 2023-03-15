import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, take } from 'rxjs';
import { Training } from '../models/training.interface';
import { User } from '../models/user.interface';
import { TrainingManagementSystemFacade } from '../store/store.facade';
@Component({
  selector: 'app-employee-profile',
  templateUrl: './employee-profile.component.html',
  styleUrls: ['./employee-profile.component.scss'],
})
export class EmployeeProfileComponent implements OnInit {
  employee$: Observable<User>;
  employeeId: number;
  trainings$: Observable<Training[]>;
  displayUpdateInfo = 'none';
  displayDeleteModal = 'none'
  displayChangeManagerModal = 'none';
  managers$: Observable<User[]>;

  updateForm: FormGroup = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
    ]),
    password: new FormControl('', Validators.required),
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    mobileNo: new FormControl('', [
      Validators.required,
      Validators.pattern('[- +()0-9]+'),
    ]),
    address: new FormControl('', [Validators.required]),
  });

  changeManagerForm: FormGroup = new FormGroup({
    manager: new FormControl('', Validators.required)
  });

  constructor(
    private route: ActivatedRoute,
    private facade: TrainingManagementSystemFacade,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.facade.loadUsers();
    this.facade.loadTrainings();
    this.facade.loadAppliedTrainings();

    this.employeeId = Number(this.route.snapshot.paramMap.get('id'));

    this.employee$ = this.facade.getUserById(this.employeeId);

    this.trainings$ = this.facade.getTrainingsByEmployeeId(this.employeeId);

    this.employee$.subscribe((value) => this.updateForm.patchValue(value));
    this.managers$ = this.facade.getManagers();
  }

  onCloseHandled() {
    this.displayUpdateInfo = 'none';
    this.displayDeleteModal = 'none';
    this.displayChangeManagerModal = 'none';
    this.updateForm.reset();
  }

  openUpdateInfoModal(){
    this.displayUpdateInfo = 'block';
  }

  openDeleteModal(){
    this.displayDeleteModal = 'block';
  }

  openChangeManagerModal() {
    this.displayChangeManagerModal = 'block';
  }


  goToTrainingDetails(id: number): void {
    this.router.navigate([`/trainings/${id}`]);
  }

  get hasHRRole(): boolean {
    return localStorage.getItem('role') === 'HR'
  }

  updateUserInfo(){
    const user: User = this.updateForm.getRawValue();
    var emailExists;
    var phoneExists;

    this.facade
      .getUsers()
      .pipe(take(1))
      .subscribe((res) => {
        emailExists = res.filter((x) => x.email === user.email).length > 1;
        phoneExists = res.filter((x) => x.mobileNo === user.mobileNo).length > 1;
      });

      this.facade
      .getUserById(this.employeeId)
      .pipe(take(1))
      .subscribe((res) => {
       user.managerName = res.managerName;
      });

    user.id = this.employeeId;
    user.role = localStorage.getItem('role') as string;
   
    if (emailExists) {
      alert('An account with this email already exists');
    } else if (phoneExists) {
      alert('An account with this Phone Number already exists');
    } else {
      this.facade.updateUser(user);
      this.onCloseHandled();
      alert('Information updated!');
    }
  }

  delete(){
    this.facade.deleteEmployee(this.employeeId);
    alert('Employee was deleted!');
    this.router.navigate(['/employees'])
  }

  changeManager(){
    const formValue = this.changeManagerForm.getRawValue();

    const payload = {
      employeeId: this.employeeId,
      managerId: formValue.manager
    }

    this.facade.updateEmployeeManager(payload);
    alert('Manager updated!');
    this.displayChangeManagerModal = 'none';
  }

  getImage(trainingName: string): string {
    if (trainingName.includes('Angular'))
      return 'https://www.freecodecamp.org/news/content/images/size/w2000/2020/04/Copy-of-Copy-of-Travel-Photography-1.png';
    else if (trainingName.includes('.NET'))
      return 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Microsoft_.NET_logo.svg/1200px-Microsoft_.NET_logo.svg.png';
    else if (trainingName.includes('React'))
      return 'https://itsg-global.com/wp-content/uploads/2016/09/react-js-to-use-or-not-to-use.png';
    else if (trainingName.includes('Java'))
      return 'https://www.developer.com/wp-content/uploads/2021/09/Java-tutorials.jpg';
    else return 'https://miro.medium.com/max/800/1*M_GDn6RXZSZC66kvrMHh5Q.png';
  }

  get email() {
    return this.updateForm.get('email');
  }

  get password() {
    return this.updateForm.get('password');
  }

  get firstName() {
    return this.updateForm.get('firstName');
  }

  get lastName() {
    return this.updateForm.get('lastName');
  }

  get mobileNo() {
    return this.updateForm.get('mobileNo');
  }

  get address() {
    return this.updateForm.get('address');
  }

  get manager() {
    return this.changeManagerForm.get('manager');
  }
}
