import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.scss'],
})
export class SidenavListComponent implements OnInit, OnDestroy {
  @Output() navclose = new EventEmitter<void>();
  public isAuth: boolean = false;
  private authSubscription: Subscription = new Subscription();
  constructor(private authService: AuthService) {}
  ngOnInit(): void {
    this.authSubscription = this.authService.authChange.subscribe(
      (auth) => (this.isAuth = auth)
    );
  }

  closeSideNav() {
    this.navclose.emit();
  }
  logout() {
    this.authService.logout();
  }
  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }
}
