import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MaterialModule } from "../material.module";
import { DragAndDropComponent } from "./drag-and-drop/drag-and-drop.component";
import { GridCellDirective } from "./drag-and-drop/grid-cell.directive";
import { GridCellComponent } from "./drag-and-drop/grid-cell/grid-cell.component";
import { TimedButtonComponent } from "./timed-button/timed-button.component";

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  declarations: [
    TimedButtonComponent,
    DragAndDropComponent,
    GridCellComponent,
    GridCellDirective
  ],
  exports: [
    TimedButtonComponent,
    DragAndDropComponent,
    GridCellComponent,
    GridCellDirective
  ]
})
export class ComponentsModule {}