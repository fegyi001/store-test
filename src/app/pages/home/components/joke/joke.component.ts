import { Component, Input } from '@angular/core'

import { Joke } from '../../models/joke.interface'

@Component({
  selector: 'app-joke',
  templateUrl: './joke.component.html',
  styleUrls: ['./joke.component.scss']
})
export class JokeComponent {
  @Input() joke: Joke
}
