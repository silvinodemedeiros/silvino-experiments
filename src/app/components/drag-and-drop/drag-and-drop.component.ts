import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-drag-and-drop',
  templateUrl: './drag-and-drop.component.html',
  styleUrls: ['./drag-and-drop.component.css']
})
export class DragAndDropComponent implements OnInit {

  @ViewChild('dropArea') dropArea!: ElementRef;

  grid = [
    {content: '1', area: '1 / 1 / 2 / 3'},
    {content: '2', area: '2 / 1 / 3 / 2'},
    {content: '3', area: '2 / 2 / 3 / 3'}
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
    ev.dataTransfer.setData("text", ev.target.id);
  }
  
  drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    this.dropArea.nativeElement.appendChild(document.getElementById(data));
  }

  constructor() { }

  ngOnInit() {
  }

}