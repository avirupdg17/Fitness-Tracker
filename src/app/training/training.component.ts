import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Exercise } from './model/exercise.model';
import { TrainingService } from './services/training.service';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss'],
})
export class TrainingComponent implements OnInit {
  public ex: Exercise = { uid: '', id: '', name: '', calories: 0, duration: 0 };
  public started: boolean = false;
  public exerciseSubscription: Subscription = new Subscription();
  constructor(private trainS: TrainingService) {}
  ngOnInit() {
    this.exerciseSubscription = this.trainS.trainingStarted.subscribe((ex) => {
      if (ex.id !== '') this.started = true;
      else this.started = false;
    });
  }
}
