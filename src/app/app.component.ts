import { trigger } from '@angular/animations';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { BehaviorSubject, fromEvent, Subscription, interval } from 'rxjs';
import { mergeWith, switchMap, takeUntil } from 'rxjs';
import { map } from 'rxjs';
import { takeWhile, debounceTime } from 'rxjs';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('fadeSpinIn', [])
  ]
})
export class AppComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('timedButton', { read: ElementRef }) timedButton;

  spinnerValue = 0;
  spinnerValue$ = new BehaviorSubject(0);
  intervalRate = 10;
  progressIncrement = 1;

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
            return this.spinnerValue - this.progressIncrement >= 0
              ? (this.spinnerValue -= this.progressIncrement)
              : (this.spinnerValue = 0);
          }),
          takeUntil(mouseHold$),
          takeWhile(() => this.spinnerValue >= 0)
        )
      )
    );

    const mouseHold$ = fromEvent<MouseEvent>(button, 'mousedown').pipe(
      switchMap(() =>
        interval(this.intervalRate).pipe(
          map(() =>
            this.spinnerValue + this.progressIncrement <= 100
              ? (this.spinnerValue += this.progressIncrement)
              : (this.spinnerValue = 100)
          ),
          takeUntil(mouseEnd$),
          debounceTime(200),
          takeWhile(() => this.spinnerValue <= 100)
        )
      )
    );

    const sub = mouseHold$.pipe(mergeWith(mouseEnd$)).subscribe((val) => (this.progress = val));

    this.sub.add(sub);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
