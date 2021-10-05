import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { PartnerQuotationStat } from '@interfaces/partner-quotation-stat.interface';
import { RangeData } from '@interfaces/range-data.interface';

import { ContainerLeadUsersKpisService } from './container-lead-users-kpis.service';

@Component({
  selector: 'agt-container-lead-users-kpis',
  templateUrl: './container-lead-users-kpis.component.html',
  styles: [
  ],
  providers: [ContainerLeadUsersKpisService]
})
export class ContainerLeadUsersKpisComponent implements OnChanges {
    @Input() range: RangeData | null = null;

    constructor(private _containerLeadUsersKpisService: ContainerLeadUsersKpisService) { }

    ngOnChanges(changes: SimpleChanges): void {
        this.model.kpis = [];
        this._loadUsersQuotationsStats(changes.range.currentValue)
    }

    get model(): ContainerLeadUsersKpisService {
        return this._containerLeadUsersKpisService;
    }

    private _loadUsersQuotationsStats(range: RangeData): void {
        this.model.getUsersQuotationsStats(range).subscribe((res: PartnerQuotationStat[][]) => {
            this.model.loadUsersQuotationsStatsData(res, range);
        });
    }

}
