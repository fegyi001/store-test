import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'
import { MatListModule } from '@angular/material/list'
import { StoreModule } from '@ngrx/store'

import { HomeComponent } from './home.component'
import { HomeRoutingModule } from './home-routing.module'
import { reducers } from './store'

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatListModule,
    MatButtonModule,
    StoreModule.forFeature('home', reducers)
  ]
})
export class HomeModule {}
