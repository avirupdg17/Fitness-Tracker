import { Injectable } from '@angular/core';
import { EXERCISES } from '../exercises';
import { Exercise } from '../exercise.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TrainingService {
  private availableExercises: Exercise[] = EXERCISES;
  private currentExercise: any;
  private exercises: Exercise[] = [];
  public trainingStarted = new Subject<Exercise>();
  constructor() {}
  startTraining(selectedId: string) {
    //console.log(selectedId);
    this.currentExercise = this.availableExercises.find(
      (ex) => ex.id === selectedId
    );
    //console.log(this.currentExercise);
    this.trainingStarted.next({ ...this.currentExercise });
  }
  stopTraining(progress: number) {
    this.updateTrainingData('cancelled', progress);
  }

  updateTrainingData(state: 'completed' | 'cancelled', progress: number = 100) {
    this.exercises.push({
      ...this.currentExercise,
      duration: this.currentExercise.duration * (progress / 100),
      calories: this.currentExercise.calories * (progress / 100),
      date: new Date(),
      state: state,
    });
    this.currentExercise = {
      id: '',
      name: '',
      calories: 0,
      duration: 0,
    };
    this.trainingStarted.next(this.currentExercise);
  }
  completeTraining() {
    this.updateTrainingData('completed');
  }
  getTraining() {
    return this.availableExercises.slice();
  }

  getRunningExercise() {
    return { ...this.currentExercise };
  }

  getPastExercises() {
    return this.exercises.slice();
  }
}
