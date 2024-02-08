import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { RouterModule } from '@angular/router';
import { AppModule } from '../../../app.module';
import { HighlightDirective } from '../../directives/highlight.directive';

@NgModule({
  declarations: [
    HeaderComponent,
    HighlightDirective
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [
    HeaderComponent
  ]
})
export class HeaderModule {
}
