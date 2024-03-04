import { Component } from '@angular/core';
import { User } from '../classes/User';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent {
  users: User[] = [
    {
      id: 1,
      name: 'Test Name',
      image: 'https://placeholder.co/200x200',
    },
    {
      id: 2,
      name: 'Test Name 2',
      image: 'https://placeholder.co/200x200',
    },
    {
      id: 3,
      name: 'Test Name 3',
      image: 'https://placeholder.co/200x200',
    }
  ]
}
