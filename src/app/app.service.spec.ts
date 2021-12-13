import { TestBed } from '@angular/core/testing'
import { StoreModule } from '@ngrx/store'

import { AppService } from './app.service'
import { reducers } from './store/app.state'

describe('AppService', () => {
  let service: AppService

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot(reducers)]
    })
    service = TestBed.inject(AppService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  it('should add two numbers', () => {
    const result = service.addTwoNumbers(2, 2)
    expect(result).toBe(4)
  })

  it('should add two numbers', () => {
    const result = service.subtractTwoNumbers(2, 2)
    expect(result).toBe(0)
  })
})
