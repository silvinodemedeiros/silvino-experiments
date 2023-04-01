import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-drag-and-drop',
  templateUrl: './drag-and-drop.component.html',
  styleUrls: ['./drag-and-drop.component.css']
})
export class DragAndDropComponent implements OnInit {
  // TODO
  // change grid after click
  // create cell components
  // implement grid service: will manage cell retrieval and data
  // create widget components
  // hotkeys (letters for grids for example idk)

  @ViewChild('dropArea') dropArea!: ElementRef;
  currentlyDragging = null;

  gridOptions = [
    {
      id: 1,
      cells: [
        {content: '', area: '1 / 1 / 2 / 3'},
        {content: '', area: '2 / 1 / 3 / 2'},
        {content: '', area: '2 / 2 / 3 / 3'}
      ]
    },
    {
      id: 2,
      cells: [
        {content: '', area: '1 / 1 / 2 / 2'},
        {content: '', area: '2 / 1 / 3 / 2'},
        {content: '', area: '1 / 2 / 3 / 3'}
      ]
    }
  ];

  selectedGrid = this.gridOptions[0];

  widgetList = [
    {name: 'A'},
    {name: 'B'},
    {name: 'C'},
    {name: 'D'}
  ];

  constructor() { }

  ngOnInit() {
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
    this.selectedGrid = this.gridOptions.filter(({id}) => nextGridId === id)[0];
  }

}