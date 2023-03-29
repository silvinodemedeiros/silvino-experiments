import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-drag-and-drop',
  templateUrl: './drag-and-drop.component.html',
  styleUrls: ['./drag-and-drop.component.css']
})
export class DragAndDropComponent implements OnInit {

  @ViewChild('dropArea') dropArea!: ElementRef;

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