import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { CounterComponent } from './shared/counter/counter.component';
import { RouterOutlet } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, HeaderComponent, CounterComponent, RouterOutlet, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
