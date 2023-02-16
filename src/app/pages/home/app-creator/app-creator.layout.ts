import { Component, OnInit } from '@angular/core';

import { ROUTES_NAME } from '@constants/routes-name';

@Component({
  selector: 'agt-app-creator',
  templateUrl: './app-creator.layout.html',
  styles: [
  ]
})
export class AppCreatorLayout {
    ROUTES_NAME: any = ROUTES_NAME;
}
