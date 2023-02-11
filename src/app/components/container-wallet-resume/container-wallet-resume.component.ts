import { Component } from '@angular/core';
import * as moment from 'moment';

import { RangeData } from '@interfaces/range-data.interface';

@Component({
  selector: 'agt-container-wallet-resume',
  templateUrl: './container-wallet-resume.component.html',
  styles: [
  ]
})
export class ContainerWalletResumeComponent {
    rangeData: RangeData = {
        rangeStart: moment().subtract(300, 'days').format('DD/MM/YYYY'),
        rangeEnd: moment().format('DD/MM/YYYY'),
        rangeField: ''
    }
}
