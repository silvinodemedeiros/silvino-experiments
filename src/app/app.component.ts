import { trigger } from '@angular/animations';
import { Component, OnInit, } from '@angular/core';

@Component({
  selector: 'app-component',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  todo = [
    'Customize size',
    'Parametrize attributes',
    'Implement event for when timer reaches 100%',
  ];

  constructor() {}

  ngOnInit() {}
}
