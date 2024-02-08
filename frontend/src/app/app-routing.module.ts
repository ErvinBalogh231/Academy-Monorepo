import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./shared/modules/home/home/home.component";
import { UsersComponent } from "./pages/users/users.component";
import { BadgesComponent } from "./pages/badges/badges.component";
import { UserCreateComponent } from './pages/user-create/user-create.component';
import { UserEditComponent } from './pages/user-edit/user-edit.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './shared/guards/auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'home',
    canActivate: [AuthGuard],
    component: HomeComponent
  },
  { path: 'users',
    canActivate: [AuthGuard],
    component: UsersComponent
  },
  { path: 'user-create',
    canActivate: [AuthGuard],
    component: UserCreateComponent
  },
  { path: 'user-edit/:userId',
    canActivate: [AuthGuard],
    component: UserEditComponent
  },
  { path: 'badges',
    canActivate: [AuthGuard],
    component: BadgesComponent
  },
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
})
export class AppRoutingModule {
}
