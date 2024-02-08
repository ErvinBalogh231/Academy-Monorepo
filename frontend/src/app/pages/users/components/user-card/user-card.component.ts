import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../classes/User';
import { Badge } from '../../../badges/classes/badge';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss'],
})
export class UserCardComponent {
  @Input({ required: true })
  user: User;

  @Input({ required: true })
  badges: Badge[];

  @Output()
  deleteClicked = new EventEmitter<number>;

  getBadgeImage(badgeId: number) {
    let badgeDetail: Badge;

    for (let i = 0; i < this.badges.length; i++) {
      if (this.badges[i].id === badgeId) {
        badgeDetail = this.badges[i];
        break;
      }
    }

    return badgeDetail.image;
  }

  deleteUser(id: number, event: MouseEvent) {
    event.stopPropagation();

    this.deleteClicked.emit(id);
  }
}
