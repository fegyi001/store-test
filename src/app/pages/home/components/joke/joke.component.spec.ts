import { ComponentFixture, TestBed } from '@angular/core/testing'

import { JokeComponent } from './joke.component'

describe('JokeComponent', () => {
  let component: JokeComponent
  let fixture: ComponentFixture<JokeComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JokeComponent]
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(JokeComponent)
    component = fixture.componentInstance
    component.joke = { id: '12', joke: 'Hello', status: 1 }
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
