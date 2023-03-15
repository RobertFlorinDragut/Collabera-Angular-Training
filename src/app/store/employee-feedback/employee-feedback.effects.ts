import {Injectable} from '@angular/core';
import {Actions,  createEffect,  ofType} from '@ngrx/effects';
import {catchError, map, switchMap} from 'rxjs/operators';
import { FeedbacksService } from '../../services';
import * as fromActions from './employee-feedback.actions';

@Injectable({
  providedIn: 'root'
})
export class FeedbacksEffects {

  constructor(private feedbackSvc: FeedbacksService, private actions: Actions) {
  }

  loadFeedbacksEffect$ = createEffect(() =>  this.actions.pipe(
    ofType(fromActions.LoadFeedbacksAction),
    switchMap(() => {
      return this.feedbackSvc.getFeedbacks()
        .pipe(
          map(feedbacks => fromActions.LoadFeedbacksSuccessAction({feedbacks})),
          catchError(err => [fromActions.LoadFeedbacksFailAction(err)])
        );
    })
  ));

  addFeedback$ =  createEffect(() => this.actions.pipe(
    ofType(fromActions.AddFeedbackAction),
    switchMap(action => {
      return this.feedbackSvc.addFeedback(action.feedback).pipe(
        map(feedback =>  fromActions.LoadFeedbacksAction()),
        catchError(error => [fromActions.AddFeedbackFailedAction(error)])
      );
    })
  ));

}
