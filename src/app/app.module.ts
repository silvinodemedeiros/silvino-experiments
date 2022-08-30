import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { AsyncPipe, CommonModule } from '@angular/common';

@NgModule({
  imports: [CommonModule, BrowserModule, FormsModule, MaterialModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
