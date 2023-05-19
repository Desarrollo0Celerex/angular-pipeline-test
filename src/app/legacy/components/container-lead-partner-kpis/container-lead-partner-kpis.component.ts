import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { ComparisonRangeData } from '@interfaces/comparison-range-data.interface';
import { PartnerQuotationStat } from '@interfaces/partner-quotation-stat.interface';

import { ContainerLeadPartnerKpisService } from './container-lead-partner-kpis.service';

@Component({
  selector: 'agt-container-lead-partner-kpis',
  templateUrl: './container-lead-partner-kpis.component.html',
  styles: [
  ],
  providers: [ContainerLeadPartnerKpisService]
})
export class ContainerLeadPartnerKpisComponent implements OnChanges {
    @Input() range: ComparisonRangeData | null = null;

    constructor(private _containerLeadPartnerKpisService: ContainerLeadPartnerKpisService) { }

    get model(): ContainerLeadPartnerKpisService {
        return this._containerLeadPartnerKpisService;
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.model.kpis = [];
        this._loadPartnersQuotationsStats(changes.range.currentValue)
    }

    private _loadPartnersQuotationsStats(range: ComparisonRangeData): void {
        this.model.getPartnersQuotationsStats(range).subscribe((res: PartnerQuotationStat[][]) => {
            this.model.loadPartnersQuotationsStatsData(res, range);
        });
    }

}
