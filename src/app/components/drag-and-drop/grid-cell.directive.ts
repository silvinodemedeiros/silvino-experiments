import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appGridCell]'
})
export class GridCellDirective implements OnInit {

  @Input('appGridCell') props = '';
  @Input() gridArea = '1 / 1 / 1 / 1'; 

  constructor(
    private element: ElementRef, private renderer: Renderer2
  ) { }

  ngOnInit() {
    this.renderer.setStyle(this.element.nativeElement, 'grid-area', this.gridArea);
  }

}