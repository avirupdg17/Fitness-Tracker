import { Component, OnInit } from '@angular/core';
import { TrainingService } from '../services/training.service';

import { MatDialog } from '@angular/material/dialog';
import { StopTrainingComponent } from '../stop-training/stop-training.component';
import { Router } from '@angular/router';

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
  constructor(
    private train: TrainingService,
    private diaglog: MatDialog,
    private router: Router
  ) {
    this.progress = 0;
    this.timer = 0;
    this.finished = false;
    this.resume = false;
  }
  ngOnInit() {
    this.progress = 0;
    this.resumeTraining();
  }
  resumeTraining() {
    this.resume = false;
    console.log(this.train.getRunningExercise().duration);
    const step = (this.train.getRunningExercise().duration / 100) * 1000;
    this.timer = window.setInterval(() => {
      this.progress += 5;
      if (this.progress >= 100) {
        this.finished = true;
        //this.train.completeTraining();
        clearInterval(this.timer);
      }
    }, step);
  }
  pauseTraining() {
    this.resume = true;
    clearInterval(this.timer);
  }
  cancelTraining() {
    this.pauseTraining();
    const dialogRef = this.diaglog.open(StopTrainingComponent, {
      data: {
        progress: this.progress,
      },
    });
    dialogRef.afterClosed().subscribe((confirm) => {
      if (confirm) this.train.stopTraining(this.progress);
      else this.resumeTraining();
    });
  }
  completeTraining() {
    this.train.completeTraining();
    this.router.navigate(['training']);
  }
}
