import { Component, EventEmitter, HostListener, Output, output } from '@angular/core';
import { NgStyle } from '@angular/common';
import { HomeComponent } from '../../pages/home/home.component';

type KeyType = 'w' | 's' | 'a' | 'd';

@Component({
  selector: 'app-controls',
  standalone: true,
  imports: [NgStyle],
  templateUrl: './controls.component.html',
  styleUrl: './controls.component.scss',
})
export class ControlsComponent {
  keysStatus: { [key in KeyType]: boolean } = {
    w: false,
    s: false,
    a: false,
    d: false,
  };

  // @Output() moveCharacter: EventEmitter<KeyType> = new EventEmitter();
  // the output above but as signal
  moveCharacter = output<KeyType>();
  
  buttonClicked(direction: KeyType) {
    this.moveCharacter.emit(direction);
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    const key = event.key.toLowerCase() as KeyType;
    if (key in this.keysStatus && !this.keysStatus[key]) {
      this.keysStatus[key] = true; // Taste wird als gedrückt markiert
    }
  }

  @HostListener('window:keyup', ['$event'])
  handleKeyUp(event: KeyboardEvent) {
    const key = event.key.toLowerCase() as KeyType;
    if (key in this.keysStatus) {
      this.keysStatus[key] = false; // Taste wird als losgelassen markiert
    }
  }

  getPosition(key: KeyType): string {
    const positionX = this.keysStatus[key] ? '-100%' : '0%';

    return `${positionX} ${this.getRowPosition(key)}`;
  }

  getRowPosition(key: KeyType): string {
    const positions: { [key in KeyType]: string } = {
      w: '1%',
      s: '34%',
      a: '67%',
      d: '101%',
    };
    return positions[key];
  }
  // loop = () => {
  //   requestAnimationFrame(this.loop);
  //   // Hier könnte Logik für kontinuierliche Animationen oder Bewegungen hinzugefügt werden
  // };
}
