import { Injectable } from '@angular/core';
import { EXERCISES } from '../exercises';
import { Exercise } from '../exercise.model';
import { Subject, Observable } from 'rxjs';
import {
  Firestore,
  collectionData,
  collection,
  CollectionReference,
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class TrainingService {
  private availableExercises: Exercise[] = [];
  private currentExercise: any;
  private exercises: Exercise[] = [];
  public trainingStarted = new Subject<Exercise>();
  public exercises$: Observable<Exercise[]>;
  constructor(private firestore: Firestore) {
    const col = collection(
      this.firestore,
      'availableExercises'
    ) as CollectionReference<Exercise>;
    this.exercises$ = collectionData(col);
  }
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
    return this.exercises$;
  }

  getRunningExercise() {
    return { ...this.currentExercise };
  }

  getPastExercises() {
    return this.exercises.slice();
  }
}
