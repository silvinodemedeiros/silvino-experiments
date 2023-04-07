import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GridService } from './services/grid.service';

@Component({
  selector: 'app-drag-and-drop',
  templateUrl: './drag-and-drop.component.html',
  styleUrls: ['./drag-and-drop.component.css'],
  providers: [
    GridService
  ]
})
export class DragAndDropComponent implements OnInit {
  // TODO
  // store widget on cell (through data) (intially with pure html)
  // store widget but now with components instead of pure html
  // implements ngOnDestroy
  // widget CRUD
  // extract selectedGrid from the GridService into a new DragAndDropService

  @ViewChild('dropArea') dropArea!: ElementRef;
  currentlyDragging = null;

  widgetList = [
    {title: 'A'},
    {title: 'B'},
    {title: 'C'},
    {title: 'D'}
  ];

  get gs() {
    return this.gridService;
  }

  constructor(private gridService: GridService) {
  }

  ngOnInit() {
    this.gridService.init();
  }

  allowDrop(ev) {
    ev.preventDefault();
  }
  
  drag(ev) {
    this.currentlyDragging = ev.target;
  }
  
  drop(ev) {
    ev.preventDefault();
    const widget = this.currentlyDragging;

    while(ev.target.lastChild) {
      ev.target.removeChild(ev.target.lastChild);
    }

    // this.gs.assignWidgetToCell(this.currentlyDragging, ev.target);
    console.log(this.currentlyDragging, ev.target);
    this.currentlyDragging = null;
    ev.target.appendChild(widget.cloneNode(true));
  }

}