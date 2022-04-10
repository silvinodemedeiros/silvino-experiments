import { Component, OnInit } from '@angular/core';
import { concat, timer } from 'rxjs';
import { concatMap } from 'rxjs/operators';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'my-app',
  templateUrl: './box-model.html',
  styleUrls: ['./box-model.css'],
  //templateUrl: './app.component.html',
  //styleUrls: ['./gama-presentation.css'],
})
export class AppComponent implements OnInit {
  margin = true;
  padding = true;
  border = true;

  // box-model
  indicatorValue = -1;
  screenStage = 1;

  toggleAttr(attr) {
    this[attr] = !this[attr];
  }

  getColorByAttr(attr) {
    return this[attr] ? 'accent' : 'primary';
  }

  setIndicator(x) {
    this.indicatorValue = x;
  }

  constructor() {
  }

  ngOnInit() {
    concat(
      timer(3000).pipe(tap(() => this.screenStage = 2)),
      timer(2000).pipe(tap(() => this.indicatorValue = 4)),
      timer(2000).pipe(tap(() => this.indicatorValue = 3)),
      timer(2000).pipe(tap(() => this.indicatorValue = 2)),
      timer(2000).pipe(tap(() => this.indicatorValue = 1))
    ).subscribe();
  }
}
