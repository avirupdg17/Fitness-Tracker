import { Component, OnInit } from '@angular/core';
import { Exercise } from '../exercise.model';
import { TrainingService } from '../services/training.service';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss'],
})
export class NewTrainingComponent implements OnInit {
  public availableExercises: Exercise[] = [];
  public exerciseSubscription: Subscription = new Subscription();
  constructor(private train: TrainingService) {}
  ngOnInit(): void {
    this.getAvailableTrainings();
  }
  getAvailableTrainings() {
    this.availableExercises = this.train.getTraining();
  }
  startNewTraining(form: NgForm) {
    //console.log(form.value.training);
    this.train.startTraining(form.value.training);
  }
}
