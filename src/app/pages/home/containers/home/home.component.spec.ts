import { HttpClientTestingModule } from '@angular/common/http/testing'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { MatListModule } from '@angular/material/list'
import { StoreModule } from '@ngrx/store'

import { reducers } from '../../../../store/app.state'
import { HomeService } from '../../services/home.service'
import { reducers as homeReducers } from '../../state/home.state'
import { HomeComponent } from './home.component'

describe('HomeComponent', () => {
  let component: HomeComponent
  let fixture: ComponentFixture<HomeComponent>
  let homeServiceSpy: jasmine.SpyObj<HomeService>

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('HomeService', [
      'getJokes$',
      'fetchJoke$',
      'addJoke'
    ])
    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [
        HttpClientTestingModule,
        StoreModule.forRoot(reducers),
        StoreModule.forFeature('home', homeReducers),
        MatListModule
      ],
      providers: [{ provide: HomeService, useValue: spy }]
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent)
    component = fixture.componentInstance
    homeServiceSpy = TestBed.inject(HomeService) as jasmine.SpyObj<HomeService>
    fixture.detectChanges()
  })

  it('should create the component', () => {
    expect(component).toBeTruthy()
  })

  it('should get jokes from store on start', () => {
    expect(homeServiceSpy.getJokes$).toHaveBeenCalledTimes(1)
  })
})
