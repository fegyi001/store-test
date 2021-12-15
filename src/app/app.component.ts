import { Component, OnDestroy } from '@angular/core'
import { Router } from '@angular/router'
import { filter, Observable, Subscription } from 'rxjs'

import { AppService } from './app.service'
import { User } from './models/user.interface'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  user$: Observable<User | null>
  userAuthenticatedSub: Subscription | null

  constructor(private service: AppService, private router: Router) {
    this.user$ = this.service.getUser$()
    this.userAuthenticatedSub = this.user$
      .pipe(filter((user) => user !== null))
      .subscribe(() => {
        this.router.navigate(['/home'])
      })
  }

  ngOnDestroy() {
    this.userAuthenticatedSub?.unsubscribe()
  }

  logout(): void {
    this.service.setUser(null)
    this.router.navigate([''])
  }
}
