import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { RangeData } from '@interfaces/range-data.interface';
import { Stat } from '@interfaces/stat.interface';

import { ContainerLeadConversionKpisService } from './container-lead-conversion-kpis.service';

@Component({
  selector: 'agt-container-lead-conversion-kpis',
  templateUrl: './container-lead-conversion-kpis.component.html',
  styles: [
  ],
  providers: [ContainerLeadConversionKpisService]
})
export class ContainerLeadConversionKpisComponent implements OnChanges {
    @Input() range: RangeData | null = null;

    constructor(private _containerLeadConversionKpisService: ContainerLeadConversionKpisService) { }

    ngOnChanges(changes: SimpleChanges): void {
        this.model.resetKpis(changes.range.currentValue);
        this._loadTotalWorkspaceGeneratedQuotes(changes.range.currentValue);
    }

    get model(): ContainerLeadConversionKpisService {
        return this._containerLeadConversionKpisService;
    }

    private _loadTotalWorkspaceGeneratedQuotes(range: RangeData): void {
        this.model.getTotalWorkspaceGeneratedQuotes(range).subscribe((res: number[]) => {
            this._loadTotalWorkspaceAccceptedQuotes(res, range);
            this._loadTotalChannelAcceptedQuotes(res, range);
            this._loadTotalWorkspaceRejectedQuotes(res, range);
        })
    }

    private _loadTotalWorkspaceAccceptedQuotes(totalQuotations: number[], range: RangeData): void {
        this.model.getTotalWorkspaceAcceptedQuotes(range).subscribe((res: number[]) => {
            this.model.loadConversionRate(totalQuotations, res);
        })
    }

    private _loadTotalChannelAcceptedQuotes(totalQuotations: number[], range: RangeData): void {
        this.model.getTotalChannelAcceptedQuotes(range).subscribe((res: Stat[][]) => {
            const sortedAcceptedQuotesByChannel: any[] = this.model.sortAcceptedQuotesByChannel(res);
            this.model.loadHighestRate(totalQuotations, sortedAcceptedQuotesByChannel);
            this.model.loadLowestRate(totalQuotations, sortedAcceptedQuotesByChannel);
        })
    }

    private _loadTotalWorkspaceRejectedQuotes(totalQuotations: number[], range: RangeData): void {
        this.model.getTotalWorkspaceRejectedQuotes(range).subscribe((res: number[]) => {
            this.model.loadRejectionRate(totalQuotations, res);
        })
    }

}
