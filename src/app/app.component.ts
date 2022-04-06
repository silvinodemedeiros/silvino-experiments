import { Component, VERSION } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  name = 'Angular ' + VERSION.major;
  constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer) {
    matIconRegistry.addSvgIcon(
      'angular',
      domSanitizer.bypassSecurityTrustResourceUrl('https://0t2.github.io/angular-material-notes/svg/angular.svg'))
      .addSvgIconInNamespace(
      'custom-svg',
      'angular',
      domSanitizer.bypassSecurityTrustResourceUrl('https://0t2.github.io/angular-material-notes/svg/angular_solidBlack.svg'))
      .addSvgIconSetInNamespace('core',
      domSanitizer.bypassSecurityTrustResourceUrl('https://0t2.github.io/angular-material-notes/svg/core-icon-set.svg'))
      .registerFontClassAlias('fontawesome', 'fa');
  }
}
