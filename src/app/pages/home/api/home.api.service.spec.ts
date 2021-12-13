import { HttpClient } from '@angular/common/http'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { TestBed } from '@angular/core/testing'
import { of } from 'rxjs'

import { Joke } from '../models/joke.interface'
import { HomeApiService } from './home.api.service'

describe('HomeApiService', () => {
  let service: HomeApiService
  let httpClientSpy: jasmine.SpyObj<HttpClient>

  beforeEach(() => {
    const spy = jasmine.createSpyObj('HttpClient', ['get'])
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{ provide: HttpClient, useValue: spy }]
    })
    service = TestBed.inject(HomeApiService)
    httpClientSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>
  })

  it('should fetch a joke', (done: DoneFn) => {
    const expectedJoke: Joke = {
      id: '123213',
      joke: 'It was raining cats and dogs the other day. I almost stepped in a poodle.',
      status: 200
    }
    httpClientSpy.get.and.returnValue(of(expectedJoke))
    service.fetchJoke$().subscribe({
      next: (joke) => {
        expect(joke).withContext('expected joke').toEqual(expectedJoke)
        done()
      },
      error: () => done.fail
    })
    expect(httpClientSpy.get.calls.count()).withContext('one call').toBe(1)
  })
})
