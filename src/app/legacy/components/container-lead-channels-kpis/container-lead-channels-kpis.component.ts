import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

import { ComparisonRangeData } from '@interfaces/comparison-range-data.interface';
import { Stat } from '@interfaces/stat.interface';

import { ContainerLeadChannelsKpisService } from './container-lead-channels-kpis.service';

@Component({
    selector: 'agt-container-lead-channels-kpis',
    templateUrl: './container-lead-channels-kpis.component.html',
    styles: [],
    providers: [ContainerLeadChannelsKpisService],
    standalone: false
})
export class ContainerLeadChannelsKpisComponent implements OnChanges, OnInit {
    @Input() range: ComparisonRangeData | null = null;

    constructor(private _containerLeadChannelsKpisService: ContainerLeadChannelsKpisService) { }

    ngOnChanges(changes: SimpleChanges): void {
        this.model.loadRangeDates(changes.range.currentValue)
        this._loadContactSourcesStats(changes.range.currentValue);
        this._loadActivePartners(changes.range.currentValue);
        this._loadTotalGeneratedLeads(changes.range.currentValue);
    }

    ngOnInit(): void {
        this._loadAllGeneratedLeads();
    }

    get model(): ContainerLeadChannelsKpisService {
        return this._containerLeadChannelsKpisService;
    }

    private _loadContactSourcesStats(range: ComparisonRangeData): void {
        this.model.getContactSourcesStats(range).subscribe((contactSourcesStats: Stat[][]) => {
            this.model.loadActiveChannelsData(contactSourcesStats);
        });
    }

    private _loadActivePartners(range: ComparisonRangeData): void {
        this.model.getPartners(range).subscribe((stats: Stat[][]) => {
            this.model.loadActivePartnersData(stats);
        });
    }

    private _loadTotalGeneratedLeads(range: ComparisonRangeData): void {
        this.model.getTotalGeneratedLeads(range).subscribe((res: number[]) => {
            this.model.loadTotalGeneratedLeads(res);
            this.model.loadDailyAverage(res, range);
        });
    }

    private _loadAllGeneratedLeads(): void {
        this.model.getAllGeneratedLeads().subscribe((res: number) => {
            this.model.loadAllGeneratedLeads(res);
        })
    }

}
