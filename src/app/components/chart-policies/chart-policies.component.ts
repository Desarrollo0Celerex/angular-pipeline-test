import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { RangeData } from '@interfaces/range-data.interface';
import { RangeStat } from '@interfaces/range-stat.interface';

import { ChartPoliciesService } from './chart-policies.service';

@Component({
  selector: 'agt-chart-policies',
  templateUrl: './chart-policies.component.html',
  styles: [
  ],
  providers: [ChartPoliciesService]
})
export class ChartPoliciesComponent implements OnChanges {
    @Input() range: RangeData | null = null;

    constructor(private _chartPoliciesService: ChartPoliciesService) { }

    ngOnChanges(changes: SimpleChanges): void {
        //StatsClientsPlugin.removeChartLostClients();
        //this._loadLostClientsStats(changes.range.currentValue);
    }

    get model(): ChartPoliciesService {
        return this._chartPoliciesService;
    }

}
