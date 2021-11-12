import { Component } from '@angular/core';

import { CONTENT_TYPES } from '@constants/global';

@Component({
  selector: 'agt-sinisters',
  templateUrl: './sinisters.page.html',
  styles: [
  ]
})
export class SinistersPage {
    CONTENT_TYPES: any = CONTENT_TYPES;
}
