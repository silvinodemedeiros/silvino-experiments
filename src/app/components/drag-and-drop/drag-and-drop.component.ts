import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-drag-and-drop',
  templateUrl: './drag-and-drop.component.html',
  styleUrls: ['./drag-and-drop.component.css']
})
export class DragAndDropComponent implements OnInit {
  // TODO
  // multiple grid possibilities
  // change grid after click
  // drop widgets into cells

  @ViewChild('dropArea') dropArea!: ElementRef;
  currentlyDragging = null;

  grid = [
    {content: '', area: '1 / 1 / 2 / 3'},
    {content: '', area: '2 / 1 / 3 / 2'},
    {content: '', area: '2 / 2 / 3 / 3'}
  ];

  widgetList = [
    {name: 'A'},
    {name: 'B'},
    {name: 'C'},
    {name: 'D'}
  ];

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

  constructor() { }

  ngOnInit() {
  }

}