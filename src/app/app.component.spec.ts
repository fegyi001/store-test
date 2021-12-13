import { TestBed } from '@angular/core/testing'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { MatToolbarModule } from '@angular/material/toolbar'
import { RouterTestingModule } from '@angular/router/testing'
import { StoreModule } from '@ngrx/store'

import { AppComponent } from './app.component'
import { reducers } from './store/app.state'

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        StoreModule.forRoot(reducers),
        MatToolbarModule,
        MatIconModule,
        MatButtonModule
      ],
      declarations: [AppComponent]
    }).compileComponents()
  })

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent)
    const app = fixture.componentInstance
    expect(app).toBeTruthy()
  })
})
