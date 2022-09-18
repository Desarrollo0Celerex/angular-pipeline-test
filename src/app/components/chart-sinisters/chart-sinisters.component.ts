import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { RangeData } from '@interfaces/range-data.interface';
import { RangeStat } from '@interfaces/range-stat.interface';

import { ChartSinistersService } from './chart-sinisters.service';

declare var StatsSinistersPlugin: any;

@Component({
  selector: 'agt-chart-sinisters',
  templateUrl: './chart-sinisters.component.html',
  styles: [
  ],
  providers: [ChartSinistersService]
})
export class ChartSinistersComponent implements OnChanges {
    @Input() range: RangeData | null = null;
    @Input() insuranceId: number = 0;

    constructor(public model: ChartSinistersService) { }

    ngOnChanges(changes: SimpleChanges): void {
        StatsSinistersPlugin.removeChartSinisters();
        this._loadStatistics(changes.range.currentValue);
    }

    get canShowChart(): boolean {
        return (this.model.charData.length > 0) ? true : false;
    }

    private _loadStatistics(range: RangeData): void {
        this.model.loadStatistics(this.insuranceId, range).subscribe((res: RangeStat[][]) => {
            this.model.generateChartData(res);
            StatsSinistersPlugin.drawChartSinisters(this.model.charData);
        });
    }

}
