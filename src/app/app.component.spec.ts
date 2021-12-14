import { ComponentFixture, TestBed } from '@angular/core/testing'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { MatToolbarModule } from '@angular/material/toolbar'
import { RouterTestingModule } from '@angular/router/testing'
import { provideMockStore } from '@ngrx/store/testing'
import { of } from 'rxjs'

import { AppComponent } from './app.component'
import { AppService } from './app.service'
import { AppState } from './store/app.state'

describe('AppComponent', () => {
  let component: AppComponent
  let fixture: ComponentFixture<AppComponent>
  // let appServiceSpy: jasmine.SpyObj<AppService>
  // let store: MockStore
  const initialState: AppState = { userState: { user: null } }

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('AppService', {
      getUser$: of(null)
    })
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MatToolbarModule,
        MatIconModule,
        MatButtonModule
      ],
      declarations: [AppComponent],
      providers: [
        { provide: AppService, useValue: spy },
        provideMockStore({ initialState })
      ]
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent)
    component = fixture.componentInstance
    // appServiceSpy = TestBed.inject(AppService) as jasmine.SpyObj<AppService>
    // store = TestBed.inject(MockStore)
    fixture.detectChanges()
  })

  it('should create the component', () => {
    expect(component).toBeTruthy()
  })
})
