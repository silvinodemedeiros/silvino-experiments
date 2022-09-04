import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject, fromEvent, mergeWith, Subscription, switchMap, interval, map, takeUntil, debounceTime, timer } from 'rxjs';

@Component({
  selector: 'app-timed-button',
  templateUrl: './timed-button.component.html',
  styleUrls: ['./timed-button.component.css']
})
export class TimedButtonComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('timedButton', { read: ElementRef }) timedButton;

  @Input() intervalRate = 10;

  spinnerValue = 0;
  spinnerValue$ = new BehaviorSubject(0);
  progressIncrement = 1;

  sub = new Subscription();

  progressComplete$ = new BehaviorSubject(false);

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
          map(() =>
            this.spinnerValue - this.progressIncrement >= 0
              ? (this.spinnerValue -= this.progressIncrement)
              : (this.spinnerValue = 0)
          ),
          takeUntil(mouseHold$)
        )
      )
    );

    const mouseHold$ = fromEvent<MouseEvent>(button, 'mousedown').pipe(
      switchMap(() =>
        interval(this.intervalRate).pipe(
          map(() =>
            this.spinnerValue + this.progressIncrement <= 130
              ? (this.spinnerValue += this.progressIncrement)
              : (this.spinnerValue = 130)
          ),
          takeUntil(mouseEnd$)
        )
      )
    );

    const sub = mouseHold$.pipe(mergeWith(mouseEnd$)).pipe().subscribe(
      (val) => {
        if (val >= 0 && val < 130) {
          this.progress = val;
        } else if (val === 130) {
          this.progressComplete$.next(true)
        }
      }
    );

    this.sub.add(sub);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}