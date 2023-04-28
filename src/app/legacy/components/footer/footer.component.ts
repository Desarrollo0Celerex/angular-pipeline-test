import { Component } from '@angular/core';

import * as moment from 'moment';

@Component({
  selector: 'agt-footer',
  templateUrl: './footer.component.html',
  styles: [
  ]
})
export class FooterComponent {
    currentYear: string = moment().format('YYYY');
}
