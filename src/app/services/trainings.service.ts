import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Training } from '../models/training.interface';
import { environment } from '../environment/environment';


@Injectable({
  providedIn: 'root'
})
export class TrainingsService {

  constructor(private httpClient: HttpClient) { }

  getTrainings(): Observable<Training[]> {
    return this.httpClient.get<any>(environment.apiUrl + '/training');
  }

  getTrainingById(id: number): Observable<Training> {
    return this.httpClient.get<Training>(environment.apiUrl + `/training/${id}`);
  }

  addTraining(training: Training): Observable<any> {
    return this.httpClient.post(environment.apiUrl + '/hr/training', training)
  }

  deleteTraining(id: number): Observable<Training>{
    return this.httpClient.delete<Training>(environment.apiUrl + `/hr/delete/training/${id}`)
  }

}
