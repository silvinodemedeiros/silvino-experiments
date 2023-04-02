import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class GridService {

  private grids_$ = new BehaviorSubject<any[]>([]);
  private selectedGrid_$ = new BehaviorSubject<any>(null);

  get grids$() {
    return this.grids_$.asObservable();
  }

  get selectedGrid$() {
    return this.selectedGrid_$.asObservable();
  }

  grids = [
    {
      id: 1,
      cells: [
        {content: '', area: '1 / 1 / 2 / 3'},
        {content: '', area: '2 / 1 / 3 / 2'},
        {content: '', area: '2 / 2 / 3 / 3'}
      ],
      data: {}
    },
    {
      id: 2,
      cells: [
        {content: '', area: '1 / 1 / 2 / 2'},
        {content: '', area: '2 / 1 / 3 / 2'},
        {content: '', area: '1 / 2 / 3 / 3'}
      ],
      data: {}
    }
  ];

  widgets = [
    {name: 'A'},
    {name: 'B'},
    {name: 'C'},
    {name: 'D'}
  ];

  constructor() {
  }

  initializeGrids() {
    this.grids_$.next(this.grids);
  }

  selectGridById(gid: number) {
    const selected = this.grids.filter(({id}) => gid === id)[0];
    this.selectedGrid_$.next(selected);
  }

}