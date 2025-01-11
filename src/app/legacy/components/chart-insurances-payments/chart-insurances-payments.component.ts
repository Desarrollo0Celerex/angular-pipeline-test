import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { ComparisonRangeData } from '@interfaces/comparison-range-data.interface';
import { Stat } from '@interfaces/stat.interface';

import { ChartInsurancesPaymentsService } from './chart-insurances-payments.service';

declare var StatsCollectionPlugin: any;

@Component({
    selector: 'agt-chart-insurances-payments',
    templateUrl: './chart-insurances-payments.component.html',
    styles: [],
    providers: [ChartInsurancesPaymentsService],
    standalone: false
})
export class ChartInsurancesPaymentsComponent implements OnChanges {
    @Input() range: ComparisonRangeData | null = null;

    constructor(private _hartPaymentsInsurancesService: ChartInsurancesPaymentsService) { }

    ngOnChanges(changes: SimpleChanges): void {
        StatsCollectionPlugin.removeChartInsurancesPayments();
        this._loadInsurancesPaymentsStats(changes.range.currentValue);
    }

    get model(): ChartInsurancesPaymentsService {
        return this._hartPaymentsInsurancesService;
    }

    get canShowInsurancesPaymentsStats(): boolean {
        return (this.model.insurancesPaymentsStatsData.length > 0) ? true : false;
    }

    private _loadInsurancesPaymentsStats(range: ComparisonRangeData): void {
        this.model.getInsurancesPaymentsStats(range).subscribe((res: Stat[][]) => {
            this.model.loadInsurancesPaymentsStatsData(res);
            StatsCollectionPlugin.drawChartInsurancesPayments(this.model.insurancesPaymentsStatsData);
        });
    }

}
