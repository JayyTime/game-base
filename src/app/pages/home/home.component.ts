import { Component, HostListener } from '@angular/core';
import { ControlsComponent } from '../../displays/controls/controls.component';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  imports: [ControlsComponent],
})
export class HomeComponent {
  handleKeyDown(event: KeyboardEvent) {
    throw new Error('Method not implemented.');
  }
  position = { x: window.innerWidth / 2, y: window.innerHeight / 2 }; // Position des Charakters
  frameIndex = 0; // Aktueller Frame der Animation
  totalFrames = 3; // Gesamtzahl der Frames in der Gehanimation
  frameWidthAndHeight = 16; // Breite eines Frames
  direction = 0;
  lastUpdateTime = 0; // Speichert den Zeitpunkt des letzten Frame-Updates
  animationDelay = 100; // Verzögerung in Millisekunden zwischen den Frames

  // Zustände für das Tastendrücken
  lastKeyPressTime: number = 0;
  keyPressDelay: number = 50; // Verzögerung in Millisekunden
  keysStatus: any;

  ngOnInit(): void {
    const character = document.querySelector('.character') as HTMLElement;
    character.style.left = `${this.position.x}px`;
    character.style.top = `${this.position.y}px`;
    this.loop();
  }

  moveCharacterByButtonClick(direction: string) {
    const speed = 5;
    // Logik hier, um den Charakter in die gewünschte Richtung zu bewegen
    switch (direction) {
      case 'w':
        this.position.y -= speed;
        this.direction = 3;
        this.animate();
        break;
      case 's':
        this.position.y += speed;
        this.direction = 0;
        this.animate();
        break;
      case 'a':
        this.position.x -= speed;
        this.direction = 1;
        this.animate();
        break;
      case 'd':
        this.position.x += speed;
        this.direction = 2;
        this.animate();
        break;
    }

    console.log(`Move character ${direction}`);
  }

  updatePosition() {
    const character = document.querySelector('.character') as HTMLElement;
    const now = Date.now();
    if (character) {
      if (now - this.lastUpdateTime > this.animationDelay) {
        this.animate();
        this.lastUpdateTime = now; // Aktualisiere die Zeit für das letzte Update
      }
      character.style.left = `${this.position.x}px`;
      character.style.top = `${this.position.y}px`;
    }
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    const speed = 5;
    const currentTime = Date.now();

    // Prüfen, ob die Verzögerung eingehalten wurde
    if (currentTime - this.lastKeyPressTime < this.keyPressDelay) return;

    switch (event.key) {
      case 'w':
        this.position.y -= speed;
        this.direction = 3;
        this.animate();

        this.lastKeyPressTime = currentTime;
        break;
      case 's':
        this.position.y += speed;
        this.direction = 0;
        this.animate();

        this.lastKeyPressTime = currentTime;
        break;
      case 'a':
        this.position.x -= speed;
        this.direction = 1;
        this.animate();

        this.lastKeyPressTime = currentTime;
        break;
      case 'd':
        this.position.x += speed;
        this.direction = 2;
        this.animate();

        this.lastKeyPressTime = currentTime;
        break;
    }
  }

  animate() {
    this.frameIndex = (this.frameIndex + 1) % this.totalFrames; // Nächster Frame
    const posX = this.frameIndex * this.frameWidthAndHeight;
    const posY = this.direction * this.frameWidthAndHeight;
    const character = document.querySelector('.character');
    if (character) {
      character.setAttribute(
        'style',
        `background-position: -${posX}px -${posY}px; left: ${this.position.x}px; top: ${this.position.y}px;`
      );
    }
  }

  loop = () => {
    requestAnimationFrame(this.loop);
    // Hier könnte Logik für kontinuierliche Animationen oder Bewegungen hinzugefügt werden
  };
}
