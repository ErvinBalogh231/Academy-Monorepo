import { Component, OnInit } from '@angular/core';
import { Badge } from './classes/badge';
import { BadgeService } from './services/badge.service';

@Component({
  selector: 'app-badges',
  templateUrl: './badges.component.html',
  styleUrls: ['./badges.component.scss']
})
export class BadgesComponent implements OnInit {
  badges: Badge[];

  constructor(private badgeService: BadgeService) {
  }

  ngOnInit() {
    this.getBadges();
  }

  getBadges() {
    this.badgeService.getBadges().subscribe({
      next: (badges: Badge[]) => {
        this.badges = badges;
      }
    })
  }
}
