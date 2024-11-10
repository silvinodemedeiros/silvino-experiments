import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject, fromEvent, mergeWith, Subscription, switchMap, interval, map, takeUntil, debounceTime, timer } from 'rxjs';

@Component({
  selector: 'app-timed-button',
  templateUrl: './timed-button.component.html',
  styleUrls: ['./timed-button.component.css']
})
export class TimedButtonComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('timedButton', { read: ElementRef }) timedButton;

  sub = new Subscription();

  @Input() intervalRate = 20;

  spinnerValue = 0;
  spinnerValue$ = new BehaviorSubject(0);
  upperBound = 160;
  progressIncrement = 2;

  progressComplete$ = new BehaviorSubject(false);

  todo = [
    'transition animations (spin + scale down)',
    'success/error state'
  ];

  constructor() {}

  ngOnInit() {}

  ngAfterViewInit() {
    const button = this.timedButton.nativeElement;

    const decrement$ = fromEvent(button, 'mouseleave').pipe(
      mergeWith(fromEvent(button, 'mouseup')),
      switchMap(() =>
        interval(this.intervalRate).pipe(
          map(() =>
            this.spinnerValue - this.progressIncrement > 0
              ? (this.spinnerValue -= this.progressIncrement)
              : (this.spinnerValue = 0)
          ),
          takeUntil(increment$)
        )
      )
    );

    const increment$ = fromEvent<MouseEvent>(button, 'mousedown').pipe(
      switchMap(() =>
        interval(this.intervalRate).pipe(
          map(() =>
            this.spinnerValue + this.progressIncrement < this.upperBound
              ? (this.spinnerValue += this.progressIncrement)
              : (this.spinnerValue = this.upperBound)
          ),
          takeUntil(decrement$)
        )
      )
    );

    const sub = increment$.pipe(mergeWith(decrement$)).subscribe(
      (val: number) => {
        if (val >= 0 && val < this.upperBound) {
          this.spinnerValue = val;
          this.spinnerValue$.next(val);
        } else if (val === this.upperBound) {
          this.progressComplete$.next(true)
        }
      }
    );

    this.sub.add(sub);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
    this.spinnerValue$.complete();
    this.progressComplete$.complete();
  }

}