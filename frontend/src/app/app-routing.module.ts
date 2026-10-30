import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CounterComponent } from './shared/counter/counter.component';

import { UsersComponent } from './pages/users/users/users.component';
import { BadgesComponent } from './pages/badges/badges/badges.component';
import {UserCreateComponent} from "./pages/user-create/user-create.component";
import {UserEditComponent} from "./pages/user-edit/user-edit.component";
import {LoginComponent} from "./pages/login/login.component";
import {authGuard} from "./shared/guards/auth.guard";

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: UserCreateComponent },
  { path: 'counter', component: CounterComponent, canActivate: [authGuard] },
  { path: 'users', component: UsersComponent, canActivate: [authGuard] },
  { path: 'badges', component: BadgesComponent, canActivate: [authGuard] },
  { path: 'user-create', component: UserCreateComponent, canActivate: [authGuard] },
  { path: 'user-edit/:userId', component: UserEditComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: 'users' }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ]
})
export class AppRoutingModule {}
