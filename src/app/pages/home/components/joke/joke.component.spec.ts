import { ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'

import { JokeComponent } from './joke.component'

describe('JokeComponent', () => {
  let component: JokeComponent
  let fixture: ComponentFixture<JokeComponent>

  const defaultJoke = {
    id: 'qrOfN7w5ojb',
    joke: 'A cannibal is someone who is fed up with people.',
    status: 200
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JokeComponent]
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(JokeComponent)
    component = fixture.componentInstance
    component.joke = defaultJoke
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should show joke', () => {
    const element = fixture.debugElement.query(By.css('.joke'))
    expect(element).toBeTruthy()
    expect(element.nativeElement.textContent).toEqual(defaultJoke.joke)
  })
})
