import { Component } from '@angular/core';
import { PlayerComponent } from '../../characters/player/player.component';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  imports: [PlayerComponent],
})
export class HomeComponent {
  position = { x: 1000, y: 1000 }; // Startposition des Charakters
}
