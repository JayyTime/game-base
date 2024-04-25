import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlsComponent } from './controls.component';

describe('ControlsComponent', () => {
  let component: ControlsComponent;
  let fixture: ComponentFixture<ControlsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ControlsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should handle key down', () => {
    const event = new KeyboardEvent('keydown', { key: 'w' });
    component.handleKeyDown(event);
    expect(component.keysStatus.w).toBe(true);
  });

  it('should handle key up', () => {
    const event = new KeyboardEvent('keyup', { key: 'w' });
    component.handleKeyUp(event);
    expect(component.keysStatus.w).toBe(false);
  });

  it('should get position', () => {
    component.keysStatus.w = true;
    expect(component.getPosition('w')).toBe('-100% 1%');
  });

  it('should get row position', () => {
    expect(component.getRowPosition('w')).toBe('1%');
  });

  it('should emit move character', () => {
    spyOn(component.moveCharacter, 'emit');
    component.buttonClicked('w');
    expect(component.moveCharacter.emit).toHaveBeenCalledWith('w');
  });

  it('should handle key down on button click', () => {
    spyOn(component, 'handleKeyDown');
    component.buttonClicked('w');
    expect(component.handleKeyDown).toHaveBeenCalled();
  });
});
