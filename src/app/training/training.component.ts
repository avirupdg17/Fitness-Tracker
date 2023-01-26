import { Component, OnInit } from '@angular/core';
import { TrainingService } from './services/training.service';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss'],
})
export class TrainingComponent implements OnInit {
  public started: boolean;
  constructor(private trainS: TrainingService) {
    this.started = false;
  }
  ngOnInit() {
    this.trainS.trainingStarted.subscribe((val) => {
      this.started = val;
    });
  }
}
