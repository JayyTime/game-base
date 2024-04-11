import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-player',
  standalone: true,
  imports: [],
  templateUrl: './player.component.html',
  styleUrl: './player.component.scss',
})
export class PlayerComponent {
  position = { x: 500, y: 500 };
  frameIndex = 0; // Aktueller Frame der Animation
  totalFrames = 3; // Gesamtzahl der Frames in der Gehanimation
  frameWidthAndHeight = 16; // Breite eines Frames
  direction = 0;

  ngOnInit(): void {
    this.loop();
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    const speed = 5;
    switch (event.key) {
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
