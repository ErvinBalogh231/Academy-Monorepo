import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  @Input() counter: number = 0;

  increaseCounter() {
    this.counter++;
  }

  decreaseCounter() {
    this.counter--;
  }
}
