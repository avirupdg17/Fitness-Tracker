import { Subscription } from 'rxjs';
import {
  Component,
  EventEmitter,
  Output,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { SessionService } from 'src/app/shared/services/session.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  public isAuth: boolean = false;
  public username: string = '';
  private loggedIn: boolean = false;
  private authSubscription: Subscription = new Subscription();
  @Output() sideToggleClicked = new EventEmitter<void>();
  constructor(
    private authService: AuthService,
    private sessionService: SessionService
  ) {}
  ngOnInit(): void {
    this.authSubscription = this.authService.authChange.subscribe(
      (authStatus) => {
        this.isAuth = authStatus;
        if (this.isAuth) {
          this.username = this.sessionService.getSession('user')?.displayName;
        }
      }
    );
  }
  onToggleSideNav() {
    this.sideToggleClicked.emit();
  }
  logout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }
}
