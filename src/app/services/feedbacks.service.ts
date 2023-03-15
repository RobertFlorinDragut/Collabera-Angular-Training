import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environment/environment';
import { EmployeeAttendance } from '../models/employee-attendance.interface';
import { EmployeeFeedback } from '../models/employee-feedback.interface';


@Injectable({
  providedIn: 'root'
})
export class FeedbacksService {

  constructor(private httpClient: HttpClient) { }

  getFeedbacks(): Observable<EmployeeFeedback[]> {
     return this.httpClient.get<EmployeeFeedback[]>(environment.apiUrl + '/feedback');
  }

  addFeedback(feedback: EmployeeFeedback): Observable<EmployeeFeedback> {
    return this.httpClient.post<EmployeeFeedback>(environment.apiUrl + '/employee/feedback', feedback)
  }

}
