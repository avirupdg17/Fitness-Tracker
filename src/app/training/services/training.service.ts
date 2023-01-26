import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TrainingService {
  public trainingStarted = new EventEmitter<boolean>();
  constructor() {}
  startTraining() {
    this.trainingStarted.emit(true);
  }
  stoptraining() {
    this.trainingStarted.emit(false);
  }
}
