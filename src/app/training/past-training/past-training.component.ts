import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Exercise } from '../exercise.model';
import { TrainingService } from '../services/training.service';

@Component({
  selector: 'app-past-training',
  templateUrl: './past-training.component.html',
  styleUrls: ['./past-training.component.scss'],
})
export class PastTrainingComponent implements OnInit, AfterViewInit, OnDestroy {
  public pastExercises: Exercise[] = [];
  public dataSource = new MatTableDataSource<Exercise>();
  private pastExercises$: any;
  public displayedColumns: string[] = [
    'date',
    'name',
    'calories',
    'duration',
    'state',
  ];

  @ViewChild(MatSort) sort: MatSort | null = null;
  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
  constructor(private trainService: TrainingService) {}

  ngOnInit(): void {
    this.trainService.getPastExercises();
    this.pastExercises$ = this.trainService.pastExercisesChanged.subscribe(
      (pastExercises) => {
        this.pastExercises = pastExercises;
        console.log(pastExercises);
        this.dataSource.data = this.pastExercises;
      }
    );
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  doFilter(event: Event) {
    this.dataSource.filter = (event.target as HTMLInputElement).value
      .trim()
      .toLowerCase();
  }

  ngOnDestroy(): void {
    this.pastExercises$.unsubscribe();
  }
}
