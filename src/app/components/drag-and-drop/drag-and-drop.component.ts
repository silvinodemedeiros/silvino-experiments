import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GridService } from './services/grid.service';
import { WidgetService } from './services/widget.service';

@Component({
  selector: 'app-drag-and-drop',
  templateUrl: './drag-and-drop.component.html',
  styleUrls: ['./drag-and-drop.component.css'],
  providers: [
    GridService,
    WidgetService
  ]
})
export class DragAndDropComponent implements OnInit {
  // TODO
  // implements widget service
  // widget creation, update, read and delete
  // extract selectedGrid from the GridService into a new DragAndDropService
  // implement transition state (loading, )
  // implement data services

  @ViewChild('dropArea') dropArea!: ElementRef;
  currentlyDragging = null;

  get widgetList$() {
    return this.widgetService.widgetList$;
  }

  get gs() {
    return this.gridService;
  }

  constructor(
    private gridService: GridService,
    private widgetService: WidgetService
  ) {
  }

  ngOnInit() {
    this.gridService.init();
  }

  ngOnDestroy() {
    this.gs.destroy();
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
  }

}