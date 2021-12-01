import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import { resetUser } from 'src/app/store/user/user.actions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  constructor(private store: Store<AppState>, private router: Router) {}

  onLogoutClick() {
    this.store.dispatch(resetUser());
    this.router.navigate(['/']);
  }
}
