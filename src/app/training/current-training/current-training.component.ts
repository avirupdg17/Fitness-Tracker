import { Component, OnInit } from '@angular/core';
import { TrainingService } from '../services/training.service';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.scss'],
})
export class CurrentTrainingComponent implements OnInit {
  public progress: number;
  public timer: number;
  public resume: boolean;
  public finished: boolean;
  constructor(private train: TrainingService) {
    this.progress = 0;
    this.timer = 0;
    this.finished = false;
    this.resume = false;
  }
  ngOnInit() {
    this.resumeTraining();
  }
  resumeTraining() {
    this.resume = false;
    this.timer = window.setInterval(() => {
      this.progress += 5;
      if (this.progress == 100) {
        this.finished = true;
        clearInterval(this.timer);
      }
    }, 1000);
  }
  updateProgress() {}
  pauseTraining() {
    this.resume = true;
    clearInterval(this.timer);
  }
  cancelTraining() {
    this.train.stoptraining();
  }
}
