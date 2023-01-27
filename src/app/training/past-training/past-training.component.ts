import { Component, OnInit } from '@angular/core';
import { Exercise } from '../exercise.model';
import { TrainingService } from '../services/training.service';

@Component({
  selector: 'app-past-training',
  templateUrl: './past-training.component.html',
  styleUrls: ['./past-training.component.scss'],
})
export class PastTrainingComponent implements OnInit {
  constructor(private trainService: TrainingService) {}
  public pastExercises: Exercise[] = [];
  ngOnInit(): void {
    this.pastExercises = this.trainService.getPastExercises();
  }
}
