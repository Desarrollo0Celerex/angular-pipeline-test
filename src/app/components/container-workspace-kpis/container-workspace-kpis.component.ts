import { Component } from '@angular/core';
import * as moment from 'moment';

import { RangeData } from '@interfaces/range-data.interface';

@Component({
  selector: 'agt-container-workspace-kpis',
  templateUrl: './container-workspace-kpis.component.html',
  styles: [
  ]
})
export class ContainerWorkspaceKpisComponent {
    range: RangeData = {
        rangeStart: moment().subtract(300, 'days').format('DD/MM/YYYY'),
        rangeEnd: moment().format('DD/MM/YYYY'),
        rangeField: ''
    }
}
