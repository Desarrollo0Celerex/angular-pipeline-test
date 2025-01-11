import { Component } from '@angular/core';
import moment from 'moment';

import { RangeData } from '@interfaces/range-data.interface';

@Component({
    selector: 'agt-container-workspace-kpis',
    templateUrl: './container-workspace-kpis.component.html',
    styles: [],
    standalone: false
})
export class ContainerWorkspaceKpisComponent {
    rangeData: RangeData = {
        rangeStart: moment().subtract(30, 'days').format('DD/MM/YYYY'),
        rangeEnd: moment().add(40, 'days').format('DD/MM/YYYY'),
        rangeField: '',
    };
}
