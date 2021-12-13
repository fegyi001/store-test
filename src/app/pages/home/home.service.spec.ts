import { HttpClientModule } from '@angular/common/http'
import { TestBed } from '@angular/core/testing'

import { HomeApiService } from './api/home.api'
import { HomeService } from './home.service'

describe('HomeService', () => {
  let service: HomeService

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [HomeApiService]
    })
    service = TestBed.inject(HomeService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
