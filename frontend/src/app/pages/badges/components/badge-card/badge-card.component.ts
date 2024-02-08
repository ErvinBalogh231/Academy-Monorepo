import { Component, Input } from '@angular/core';
import { Badge } from '../../classes/badge';

@Component({
  selector: 'app-badge-card',
  templateUrl: './badge-card.component.html',
  styleUrls: ['./badge-card.component.scss']
})
export class BadgeCardComponent {
  @Input({ required: true }) badge: Badge;
}
