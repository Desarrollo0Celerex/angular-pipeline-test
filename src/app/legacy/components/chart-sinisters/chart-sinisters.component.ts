import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { ComparisonRangeData } from '@interfaces/comparison-range-data.interface';
import { StatRangeData } from '@interfaces/stat-range-data.interface';

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
    @Input() range: ComparisonRangeData | null = null;
    @Input() insuranceId: number = 0;

    constructor(public model: ChartSinistersService) { }

    ngOnChanges(changes: SimpleChanges): void {
        StatsSinistersPlugin.removeChartSinisters();
        this._loadStatistics(changes.range.currentValue);
    }

    get canShowChart(): boolean {
        return (this.model.charData.length > 0) ? true : false;
    }

    private _loadStatistics(range: ComparisonRangeData): void {
        this.model.loadStatistics(this.insuranceId, range).subscribe((res: StatRangeData[][]) => {
            this.model.generateChartData(res);
            StatsSinistersPlugin.drawChartSinisters(this.model.charData);
        });
    }

}
