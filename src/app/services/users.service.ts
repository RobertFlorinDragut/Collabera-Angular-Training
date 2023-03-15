import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environment/environment';
import { User } from '../models/user.interface';
import { EmployeeManager } from '../models/employee-manager.interface';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private httpClient: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(environment.apiUrl + '/hr/employees');
  }

  getUserById(id: number): Observable<User> {
    return this.httpClient.get<User>(environment.apiUrl + `/hr/employee/${id}`);
  }

  recogniseUser(email: string, password: string): Observable<User> {
    var user = { email: email, password: password };
    return this.httpClient.post<User>(
      environment.apiUrl + '/accounts/login',
      user
    );
  }

  addUser(user: User): Observable<User> {
    return this.httpClient.post<User>(environment.apiUrl + '/accounts', user);
  }

  updateUser(user: User): Observable<User> {
    var id = user.id;
    return this.httpClient.put<User>(
      environment.apiUrl + `/employee/${id}`,
      user
    );
  }

  updateManager(empManager: EmployeeManager): Observable<EmployeeManager> {
    var id = empManager.employeeId;
    return this.httpClient.put<EmployeeManager>(
      environment.apiUrl + `/hr/employee/manager/${id}`,
      empManager
    );
  }

  deleteEmployee(id: number): Observable<User> {
    return this.httpClient.delete<User>(
      environment.apiUrl + `/hr/delete/employee/${id}`
    );
  }
}
