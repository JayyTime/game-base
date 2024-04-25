import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should move the character on key press', () => {
    const event = new KeyboardEvent('keydown', { key: 'w' });
    component.moveCharacterByButtonClick('w');
    expect(component.position.y).toBe(window.innerHeight / 2 - 5);
  });

  it('should animate the character on key press', () => {
    const event = new KeyboardEvent('keydown', { key: 'w' });
    component.handleKeyboardEvent(event);
    expect(component.frameIndex).toBe(1);
  });

  it('should recognize direction changes', () => {
    const event = new KeyboardEvent('keydown', { key: 'w' });
    component.handleKeyboardEvent(event);
    expect(component.direction).toBe(3);
  });
});
