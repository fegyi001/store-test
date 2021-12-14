import { HttpClientTestingModule } from '@angular/common/http/testing'
import { TestBed } from '@angular/core/testing'
import { StoreModule } from '@ngrx/store'
import { of } from 'rxjs'

import { reducers } from '../../../store/app.state'
import { Joke } from '../models/joke.interface'
import { reducers as homeReducers } from '../state/home.state'
import { HomeApiService } from './home.api.service'
import { HomeService } from './home.service'

describe('HomeService', () => {
  let service: HomeService
  let homeApiServiceSpy: jasmine.SpyObj<HomeApiService>

  beforeEach(() => {
    const spy = jasmine.createSpyObj('HomeApiService', ['fetchJoke$'])
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        StoreModule.forRoot(reducers),
        StoreModule.forFeature('home', homeReducers)
      ],
      providers: [{ provide: HomeApiService, useValue: spy }]
    })
    service = TestBed.inject(HomeService)
    homeApiServiceSpy = TestBed.inject(
      HomeApiService
    ) as jasmine.SpyObj<HomeApiService>
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  it('should call api fetchJoke', (done: DoneFn) => {
    const expectedJoke: Joke = {
      id: '123213',
      joke: 'It was raining cats and dogs the other day. I almost stepped in a poodle.',
      status: 200
    }
    homeApiServiceSpy.fetchJoke$.and.returnValue(of(expectedJoke))
    service.fetchJoke$().subscribe({
      next: (joke) => {
        expect(homeApiServiceSpy.fetchJoke$).toHaveBeenCalledTimes(1)
        expect(joke).toEqual(expectedJoke)
        done()
      },
      error: () => done.fail
    })
  })
})
