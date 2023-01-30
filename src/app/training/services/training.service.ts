import { Injectable } from '@angular/core';
import { Exercise } from '../exercise.model';
import { Subject, from } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import {
  Firestore,
  collection,
  CollectionReference,
  getDocs,
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class TrainingService {
  private availableExercises: Exercise[] = [];
  private currentExercise: any;
  private exercises: Exercise[] = [];
  public trainingStarted = new Subject<Exercise>();
  public exercisesChanged = new Subject<Exercise[]>();
  constructor(private db: Firestore) {}
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
    const colRef = collection(
      this.db,
      'availableExercises'
    ) as CollectionReference<Exercise>;
    from(getDocs(colRef))
      .pipe(
        map((documents: any) =>
          documents.docs.map((doc: any) => {
            return {
              id: doc.id,
              name: doc.data().name,
              duration: doc.data().duration,
              calories: doc.data().calories,
            };
          })
        )
      )
      .subscribe((exercises: Exercise[]) => {
        this.availableExercises = exercises;
        this.exercisesChanged.next([...this.availableExercises]);
      });
  }

  getRunningExercise() {
    return { ...this.currentExercise };
  }

  getPastExercises() {
    return this.exercises.slice();
  }
}
