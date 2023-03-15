import { createSelector } from '@ngrx/store';
import { Dictionary } from '@ngrx/entity';

import {
  selectTrainingsEntities,
  selectTrainingsList,
  selectTrainingsLoaded,
  TrainingsState,
} from './training.reducer';
import { Training } from 'src/app/models/training.interface';
import { TrainingManagementSystemState } from '../index';
import { formatDate } from '@angular/common';
import { getApplicationsByEmployeeId } from '../applied-trainings/applied-trainings.selectors';
import { EmployeeTraining } from 'src/app/models/emplyee-training.interface';

const selectTrainingsState = (
  state: TrainingManagementSystemState
): TrainingsState => state.trainings;

export const getAllTrainings = createSelector<
  TrainingManagementSystemState,
  [TrainingsState],
  Training[]
>(selectTrainingsState, selectTrainingsList);

export const getTrainings = createSelector<
  TrainingManagementSystemState,
  [Training[]],
  Training[]
>(getAllTrainings, (trainings: Training[]) => trainings);

export const getTrainingsLoaded = createSelector<
  TrainingManagementSystemState,
  [TrainingsState],
  boolean
>(selectTrainingsState, selectTrainingsLoaded);

export const getTrainingsEntities = createSelector<
  TrainingManagementSystemState,
  [TrainingsState],
  Dictionary<Training>
>(selectTrainingsState, selectTrainingsEntities);

export const getTrainningById = (props: { id: number }) =>
  createSelector<
    TrainingManagementSystemState,
    [Dictionary<Training>],
    Training
  >(
    getTrainingsEntities,
    (entities: Dictionary<Training>) => entities[props.id] as Training
  );

export const getFutureTrainings = () =>
  createSelector<TrainingManagementSystemState, Training[], Training[]>(
    getTrainings,
    (trainings: Training[]) => {
      var trainingsToReturn:Training[] = [];
      const currentDate = formatDate(new Date(), 'yyyy-MM-dd', 'en_US');
      trainings.forEach((training) => {
		var minDate = training.trainingDates?.reduce((min, date) => date < min ? date : min, training.trainingDates[0]);

        if (formatDate(minDate, 'yyyy-MM-dd', 'en_US') > currentDate) {
          trainingsToReturn.push(training);
        }
      });
      return trainingsToReturn;
    }
  );

  export const getTrainingsByEmployeeId = (props: {employeeId: number}) => createSelector(getAllTrainings, getApplicationsByEmployeeId({employeeId: props.employeeId}),
	(traininigs: Training[], appliedTrainings: EmployeeTraining[]) => {
		var appliedTrainingsIds = appliedTrainings.map(x => x.trainingId);
		const tr =  traininigs.filter(item => appliedTrainingsIds.indexOf(item.id) >= 0)
    return tr;
	}) 
