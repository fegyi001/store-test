import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'
import { MatListModule } from '@angular/material/list'
import { StoreModule } from '@ngrx/store'

import { JokeComponent } from './components/joke/joke.component'
import { HomeComponent } from './containers/home/home.component'
import { HomeRoutingModule } from './home-routing.module'
import { reducers } from './state/home.state'

@NgModule({
  declarations: [HomeComponent, JokeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatListModule,
    MatButtonModule,
    StoreModule.forFeature('homeState', reducers)
  ]
})
export class HomeModule {}
