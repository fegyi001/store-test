import { Component } from '@angular/core'
import { Observable } from 'rxjs'

import { HomeService } from '../../home.service'
import { Joke } from '../../models/joke.interface'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  jokes$: Observable<Joke[]>

  constructor(private homeService: HomeService) {
    this.jokes$ = this.homeService.jokes$
  }

  getNewJoke(): void {
    this.homeService.fetchJoke$().subscribe((joke) => {
      this.homeService.addJoke(joke)
    })
  }
}
