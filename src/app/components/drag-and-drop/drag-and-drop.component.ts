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
  // store grid data on service
  // implements ngOnDestroy
  // widget CRUD

  @ViewChild('dropArea') dropArea!: ElementRef;
  currentlyDragging = null;

  widgetList = [
    {name: 'A'},
    {name: 'B'},
    {name: 'C'},
    {name: 'D'}
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

    ev.target.appendChild(widget.cloneNode(true));
    this.currentlyDragging = null;

    // insert widget on service model
    // emit new model
  }

}