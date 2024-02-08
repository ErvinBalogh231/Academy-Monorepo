import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
})
export class HighlightDirective {
  @Input() highlightColor: string;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {
  }

  @HostListener('mouseenter')
  highlight() {
    this.renderer.setStyle(this.elementRef.nativeElement, 'color', this.highlightColor);
  }

  @HostListener('mouseleave')
  unHighlight() {
    this.renderer.removeStyle(this.elementRef.nativeElement, 'color');
  }
}
