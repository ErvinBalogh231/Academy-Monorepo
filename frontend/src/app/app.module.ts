import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { CounterComponent } from './shared/counter/counter.component';
import { RouterOutlet } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { UsersModule } from './pages/users/users.module';
import { BadgesModule } from './pages/badges/badges.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, HeaderComponent, CounterComponent, RouterOutlet, AppRoutingModule, UsersModule, BadgesModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
