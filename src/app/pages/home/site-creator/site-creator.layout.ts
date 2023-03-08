import { Component } from '@angular/core';

import { ROUTES_NAME } from '@constants/routes-name';

@Component({
  selector: 'agt-site-creator',
  templateUrl: './site-creator.layout.html',
  styles: [
  ]
})
export class SiteCreatorLayout {
    ROUTES_NAME: any = ROUTES_NAME;
}
