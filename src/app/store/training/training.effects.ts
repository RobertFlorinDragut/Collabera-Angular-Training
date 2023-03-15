import {Injectable} from '@angular/core';
import {Actions,  createEffect,  ofType} from '@ngrx/effects';
import {catchError, map, switchMap} from 'rxjs/operators';
import { TrainingsService } from '../../services';
import * as fromActions from './training.actions';

@Injectable({
  providedIn: 'root'
})
export class TrainingsEffects {

  constructor(private trainingsService: TrainingsService, private actions: Actions) {
  }

  loadTrainingsEffect$ = createEffect(() =>  this.actions.pipe(
    ofType(fromActions.LoadTrainingsAction),
    switchMap(() => {
      return this.trainingsService.getTrainings()
        .pipe(
          map(trainings => fromActions.LoadTrainingsSuccessAction({trainings})),
          catchError(err => [fromActions.LoadTrainingsFailAction(err)])
        );
    })
  ));

  loadTrainingByIdEffect$ =  createEffect(() => this.actions.pipe(
    ofType(fromActions.LoadTrainingByIdAction),
    switchMap(action => {
      return this.trainingsService.getTrainingById(action.id).pipe(
        map(training =>  fromActions.LoadTrainingByIdSuccessAction({training})),
        catchError(error =>  [fromActions.LoadTrainingByIdFailAction(error)])
      );
    })
  ));

 
  addTraining$ =  createEffect(() => this.actions.pipe(
    ofType(fromActions.AddTrainingAction),
    switchMap(action => {
      return this.trainingsService.addTraining(action.training).pipe(
        map(training =>  fromActions.LoadTrainingsAction()),
        catchError(error => [fromActions.AddTrainingFailedAction(error)])
      );
    })
  ));

  deleteTraining$ =  createEffect(() => this.actions.pipe(
    ofType(fromActions.DeleteTrainingAction),
    switchMap(action => {
      return this.trainingsService.deleteTraining(action.id).pipe(
        map(training =>  fromActions.LoadTrainingsAction()),
        catchError(error => [fromActions.AddTrainingFailedAction(error)])
      );
    })
  ));



}
