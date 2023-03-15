import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environment/environment';
import { EmployeeAttendance } from '../models/employee-attendance.interface';


@Injectable({
  providedIn: 'root'
})
export class AttendancesService {

  constructor(private httpClient: HttpClient) { }

  getAttendances(): Observable<EmployeeAttendance[]> {
     return this.httpClient.get<EmployeeAttendance[]>(environment.apiUrl + '/attendances');
  }

  addAttendance(attendance: EmployeeAttendance): Observable<EmployeeAttendance> {
    return this.httpClient.post<EmployeeAttendance>(environment.apiUrl + '/employee/attendance', attendance)
  }

}
