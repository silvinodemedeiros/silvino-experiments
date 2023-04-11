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
        {id: 1, widget: null, area: '1 / 1 / 2 / 3'},
        {id: 2, widget: null, area: '2 / 1 / 3 / 2'},
        {id: 3, widget: null, area: '2 / 2 / 3 / 3'}
      ]
    },
    {
      id: 2,
      cells: [
        {id: 1, widget: null, area: '1 / 1 / 2 / 2'},
        {id: 2, widget: null, area: '2 / 1 / 3 / 2'},
        {id: 3, widget: null, area: '1 / 2 / 3 / 3'}
      ]
    }
  ];

  constructor() {
  }

  init() {
    this.grids_$.next(this.grids);
    this.selectGridById(1);
  }

  selectGridById(gid: number) {
    this.selectedGrid_$.next(
      this.grids.filter(({id}) => gid === id)[0]
    );
  }

  insertWidget(widgetData: any, cellId: number, gridId: number) {

    this.grids = this.grids.map(grid => {
      if (grid.id === gridId) {
        return {
          ...grid,
          cells: grid.cells.map(cell => {
            if (cell.id === cellId) {
              return {
                ...cell,
                widget: widgetData
              }
            }

            return cell;
          })
        }
      }

      return grid;
    });

    this.grids_$.next(this.grids);
    this.selectGridById(gridId);
  }

}