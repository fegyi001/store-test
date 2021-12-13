import { HttpClientModule } from '@angular/common/http'
import { TestBed } from '@angular/core/testing'
import { StoreModule } from '@ngrx/store'

import { reducers } from '../../store/app.state'
import { HomeApiService } from './api/home.api.service'
import { HomeService } from './home.service'
import { reducers as homeReducers } from './state/home.state'

describe('HomeService', () => {
  let service: HomeService

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        StoreModule.forRoot(reducers),
        StoreModule.forFeature('home', homeReducers)
      ],
      providers: [HomeApiService]
    })
    service = TestBed.inject(HomeService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
