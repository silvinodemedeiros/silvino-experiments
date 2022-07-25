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

  sub = new Subscription();

  constructor() {}

  ngOnInit() {}

  ngAfterViewInit() {
    const button = this.timedButton.nativeElement;
    const mouseDown$ = fromEvent<MouseEvent>(button, 'mousedown');
    const deactivate$ = fromEvent(button, 'mouseleave').pipe(
      mergeWith(fromEvent(button, 'mouseup'))
    );

    this.mouseHold$ = mouseDown$.pipe(
      switchMap(() => interval(10).pipe(
        takeUntil(deactivate$)
      ))
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
