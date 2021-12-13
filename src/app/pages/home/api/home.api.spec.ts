import { HttpClientModule } from '@angular/common/http'
import { TestBed } from '@angular/core/testing'

import { HomeApiService } from './home.api.service'

describe('HomeApiService', () => {
  let service: HomeApiService

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    })
    service = TestBed.inject(HomeApiService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
