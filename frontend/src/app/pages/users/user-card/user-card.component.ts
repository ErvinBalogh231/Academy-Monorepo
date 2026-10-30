import {Component, EventEmitter, Input, Output} from '@angular/core';
import { User } from '../classes/User';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss'
})
export class UserCardComponent {
  @Input() user: User;

  @Output() deleteClicked = new EventEmitter<number>

  get initials(): string {
    const initials = `${this.user.firstName?.[0] ?? ''}${this.user.lastName?.[0] ?? ''}`;

    return (initials || this.user.email[0]).toUpperCase();
  }

  deleteUser(id: number, event: MouseEvent) {
    event.stopPropagation()

    this.deleteClicked.emit(id)
  }
}
