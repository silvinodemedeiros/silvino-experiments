import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
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
  // implement grid service: will manage cell retrieval and data
  // implement dnd without actually dragging the element (use dataTransfer)

  @ViewChild('dropArea') dropArea!: ElementRef;
  currentlyDragging = null;

  selectedGridId = 1;

  widgetList = [
    {name: 'A'},
    {name: 'B'},
    {name: 'C'},
    {name: 'D'}
  ];

  get gridOptions$() {
    return this.gridService.grids$;
  }

  get selectedGrid$() {
    return this.gridService.selectedGrid$;
  }

  constructor(private gridService: GridService) {
  }

  ngOnInit() {
    this.gridService.initializeGrids();
    this.gridService.selectGridById(this.selectedGridId);
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

    ev.target.appendChild(widget);
    this.currentlyDragging = null;
  }

  selectGridById(nextGridId: number) {
    this.gridService.selectGridById(nextGridId);
  }

}