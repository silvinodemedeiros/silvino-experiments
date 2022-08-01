import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  BehaviorSubject,
  concat,
  forkJoin,
  fromEvent,
  Subscription,
  timer,
  interval,
} from 'rxjs';
import { mergeWith, switchMap, takeUntil, debounceTime } from 'rxjs';
import { map } from 'rxjs';
import { takeWhile } from 'rxjs';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('timedButton', { read: ElementRef }) timedButton;

  spinnerValue = 0;
  spinnerValue$ = new BehaviorSubject(0);
  intervalRate = 10;

  sub = new Subscription();

  todo = [
    'Componentize button',
    'Customize size',
    'Parametrize attributes',
    'Implement event for when timer reaches 100%',
  ];

  set progress(value) {
    this.spinnerValue = value;
    this.spinnerValue$.next(value);
  }

  constructor() {}

  ngOnInit() {}

  ngAfterViewInit() {
    const button = this.timedButton.nativeElement;
    const mouseEnd$ = fromEvent(button, 'mouseleave').pipe(
      mergeWith(fromEvent(button, 'mouseup')),
      switchMap(() =>
        interval(this.intervalRate).pipe(
          map(() => {
            return this.spinnerValue - 1 >= 0
              ? this.spinnerValue -= 1
              : this.spinnerValue = 0;
          }),
          takeUntil(mouseHold$),
          takeWhile(() => this.spinnerValue >= 0)
        )
      )
    );

    const mouseHold$ = fromEvent<MouseEvent>(button, 'mousedown').pipe(
      switchMap(() =>
        interval(this.intervalRate).pipe(
          map(() => {
            return this.spinnerValue + 1 <= 100
              ? this.spinnerValue += 1
              : this.spinnerValue = 100;
          }),
          takeUntil(mouseEnd$),
          takeWhile(() => this.spinnerValue <= 100)
        )
      )
    );

    const sub = mouseHold$
      .pipe(
        mergeWith(mouseEnd$)
      ).subscribe((val) => (this.progress = val));

    this.sub.add(sub);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
