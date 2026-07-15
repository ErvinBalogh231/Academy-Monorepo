import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [
    FormsModule,
  ],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.scss'
})
export class CounterComponent {
  @Input() counter: number = 26;

  increaseCounter() {
    this.counter++;
  }

  decreaseCounter() {
    this.counter--;
  }
}
