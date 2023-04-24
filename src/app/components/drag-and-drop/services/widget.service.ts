import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class WidgetService {

  private widgetList_$ = new BehaviorSubject<any[]>([]);

  get widgetList$() {
    return this.widgetList_$.asObservable();
  }

  widgetList = [
    {id: 1, title: 'A'},
    {id: 2, title: 'B'},
    {id: 3, title: 'C'},
    {id: 4, title: 'D'}
  ];

  constructor() {
    this.widgetList_$.next(this.widgetList);
  }

}