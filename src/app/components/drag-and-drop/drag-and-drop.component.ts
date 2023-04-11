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
  // --> // store widget on service
  // implements ngOnDestroy
  // widget CRUD
  // extract selectedGrid from the GridService into a new DragAndDropService

  @ViewChild('dropArea') dropArea!: ElementRef;
  currentlyDragging = null;

  widgetList = [
    {id: 1, title: 'A'},
    {id: 2, title: 'B'},
    {id: 3, title: 'C'},
    {id: 4, title: 'D'}
  ];

  get gs() {
    return this.gridService;
  }

  constructor(private gridService: GridService) {
  }

  ngOnInit() {
    this.gridService.init();

    this.gs.selectedGrid$.subscribe(console.log);
  }

  allowDrop(ev) {
    ev.preventDefault();
  }
  
  drag(ev) {
    this.currentlyDragging = ev.target;
    const widgetData = this.widgetList.filter(({id}) => {
      return id.toString() === ev.target.id.toString();
    })[0];
    ev.dataTransfer.setData('widget-data', JSON.stringify(widgetData));
  }
  
  drop(ev, cellId: number, gridId: number) {
    ev.preventDefault();
    const widget = this.currentlyDragging;
    const widgetData = JSON.parse(ev.dataTransfer.getData('widget-data'));

    while(ev.target.lastChild) {
      ev.target.removeChild(ev.target.lastChild);
    }

    this.currentlyDragging = null;
    this.gs.insertWidget(widgetData, cellId, gridId);
    // ev.target.appendChild(widget.cloneNode(true));
  }

}