import { Component, OnInit, OnDestroy } from '@angular/core';
import { Exercise } from '../model/exercise.model';
import { TrainingService } from '../services/training.service';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss'],
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  public availableExercises: Exercise[] = [];
  public exerciseSubscription: Subscription = new Subscription();
  constructor(private train: TrainingService) {}
  ngOnInit(): void {
    this.getAvailableTrainings();
  }
  getAvailableTrainings() {
    this.train.getTraining();
    this.exerciseSubscription = this.train.exercisesChanged.subscribe(
      (exercises) => (this.availableExercises = exercises)
    );
  }
  startNewTraining(form: NgForm) {
    //console.log(form.value.training);
    this.train.startTraining(form.value.training);
  }

  ngOnDestroy(): void {
    this.exerciseSubscription.unsubscribe();
  }
}
