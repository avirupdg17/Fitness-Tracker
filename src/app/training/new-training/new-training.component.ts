import { Component } from '@angular/core';
import { TrainingService } from '../services/training.service';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss'],
})
export class NewTrainingComponent {
  constructor(private train: TrainingService) {}
  startNewTraining() {
    console.log('clicked');
    this.train.startTraining();
  }
  stopNewTraining() {
    this.train.stoptraining();
  }
}
