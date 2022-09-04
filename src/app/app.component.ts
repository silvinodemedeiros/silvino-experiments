import { trigger } from '@angular/animations';
import { Component, OnInit, } from '@angular/core';

@Component({
  selector: 'app-component',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  todo = [
    'add transition animations (spin + scale down)'
  ];

  constructor() {}

  ngOnInit() {}
}
