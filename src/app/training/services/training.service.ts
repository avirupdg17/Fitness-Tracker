import { Injectable } from '@angular/core';
import { Exercise } from '../model/exercise.model';
import { Subject, Subscription, from } from 'rxjs';
import { tap, map, filter } from 'rxjs/operators';
import {
  Firestore,
  collection,
  CollectionReference,
  getDocs,
} from '@angular/fire/firestore';
import { addDoc } from 'firebase/firestore';
import { SessionService } from 'src/app/shared/services/session.service';

@Injectable({
  providedIn: 'root',
})
export class TrainingService {
  private availableExercises: Exercise[] = [];
  private currentExercise: any;
  private exercises: Exercise[] = [];
  public trainingStarted = new Subject<Exercise>();
  public exercisesChanged = new Subject<Exercise[]>();
  public pastExercisesChanged = new Subject<Exercise[]>();
  private subs: Subscription[] = [];

  constructor(private db: Firestore, private sessionService: SessionService) {}
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
    this.addExerciseDataInDatabase({
      ...this.currentExercise,
      duration: this.currentExercise.duration * (progress / 100),
      calories: this.currentExercise.calories * (progress / 100),
      date: new Date(),
      state: state,
      uid: this.sessionService.getSession('user')?.uid,
    });
    this.currentExercise = {
      id: '',
      name: '',
      calories: 0,
      duration: 0,
    };
    this.trainingStarted.next({ ...this.currentExercise });
  }
  completeTraining() {
    this.updateTrainingData('completed');
  }

  getRunningExercise() {
    return { ...this.currentExercise };
  }

  private connectCollectionDatabase(colName: string) {
    const colRef = collection(this.db, colName);
    return colRef;
  }
  getTraining() {
    const colRef = this.connectCollectionDatabase('availableExercises');
    this.subs.push(
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
        })
    );
  }

  getPastExercises() {
    const colRef = this.connectCollectionDatabase('finishedexercises');
    this.subs.push(
      from(getDocs(colRef))
        .pipe(
          map((documents: any) =>
            documents.docs.map((doc: any) => {
              return {
                id: doc.id,
                name: doc.data().name,
                duration: doc.data().duration,
                calories: doc.data().calories,
                date: doc.data().date.toDate(),
                state: doc.data().state,
                uid: doc.data().uid,
              };
            })
          )
        )
        .subscribe((exercises: Exercise[]) => {
          //console.log(exercises);
          this.exercises = exercises.filter(
            (ex) => ex.uid === this.sessionService.getSession('user')?.uid
          );
          this.pastExercisesChanged.next([...this.exercises]);
        })
    );
  }
  private addExerciseDataInDatabase(exercise: Exercise) {
    addDoc(this.connectCollectionDatabase('finishedexercises'), exercise);
  }
  cancelSubscription() {
    this.subs.forEach((sub) => sub.unsubscribe());
  }
}
