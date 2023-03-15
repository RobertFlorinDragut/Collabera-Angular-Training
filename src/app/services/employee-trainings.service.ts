import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpStatusCode } from '@angular/common/http';
import { environment } from '../environment/environment';
import { EmployeeTraining } from '../models/emplyee-training.interface';


@Injectable({
  providedIn: 'root'
})
export class EmployeeTrainingsService {

  constructor(private httpClient: HttpClient) { }

  getEmployeeTrainings(): Observable<EmployeeTraining[]> {
     return this.httpClient.get<EmployeeTraining[]>(environment.apiUrl + '/employeeTraining');
  }

  applyToTraining(empTr: EmployeeTraining): Observable<EmployeeTraining> {
    return this.httpClient.post<EmployeeTraining>(environment.apiUrl + '/employee/apply', empTr)
  }

  cancelApplication(id: number): Observable<EmployeeTraining> {
     return this.httpClient.delete<EmployeeTraining>(environment.apiUrl + `/employee/cancel/${id}`)
  }

  approveTrainingApplication(empTr: EmployeeTraining): Observable<EmployeeTraining> {
    return this.httpClient.put<EmployeeTraining>(environment.apiUrl + '/manager/approve', empTr)
  }

  declineTrainingApplication(empTr: EmployeeTraining): Observable<EmployeeTraining> {
    return this.httpClient.put<EmployeeTraining>(environment.apiUrl + '/manager/decline', empTr)
  }


}
