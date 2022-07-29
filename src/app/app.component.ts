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
import { mergeWith, switchMap, takeUntil } from 'rxjs';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('timedButton', { read: ElementRef }) timedButton;

  spinnerValue$ = new BehaviorSubject(0);
  mouseHold$;
  decreaseRate = 2;

  sub = new Subscription();

  todo = [
    'Componentize button',
    'Customize size',
    'Parametrize attributes',
    'Implement event for when timer reaches 100%',
  ];

  constructor() {}

  ngOnInit() {}

  ngAfterViewInit() {
    const button = this.timedButton.nativeElement;
    const mouseDown$ = fromEvent<MouseEvent>(button, 'mousedown');
    const mouseEnd$ = fromEvent(button, 'mouseleave').pipe(
      mergeWith(fromEvent(button, 'mouseup'))
    );

    this.mouseHold$ = mouseDown$.pipe(
      switchMap(() => interval(10).pipe(takeUntil(mouseEnd$)))
    );

    this.sub.add(
      mouseEnd$.subscribe((val: number) => {
        if (val - this.decreaseRate < this.decreaseRate) {
          this.spinnerValue$.next((val - this.decreaseRate));
        } else {
          this.spinnerValue$.next(0);
        }
      })
    );

    this.sub.add(
      this.mouseHold$.subscribe((val) => {
        this.spinnerValue$.next(val);
      })
    );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
