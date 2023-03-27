import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MaterialModule } from "../material.module";
import { DragAndDropComponent } from "./drag-and-drop/drag-and-drop.component";
import { TimedButtonComponent } from "./timed-button/timed-button.component";

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  declarations: [
    TimedButtonComponent,
    DragAndDropComponent
  ],
  exports: [
    TimedButtonComponent,
    DragAndDropComponent
  ]
})
export class ComponentsModule {}