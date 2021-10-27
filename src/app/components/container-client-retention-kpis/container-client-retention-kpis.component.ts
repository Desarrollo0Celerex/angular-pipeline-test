import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

import { RangeData } from '@interfaces/range-data.interface';

import { ContainerClientRetentionKpisService } from './container-client-retention-kpis.service';

@Component({
  selector: 'agt-container-client-retention-kpis',
  templateUrl: './container-client-retention-kpis.component.html',
  styles: [
  ],
  providers: [ContainerClientRetentionKpisService]
})
export class ContainerClientRetentionKpisComponent implements OnChanges, OnInit {
    @Input() range: RangeData | null = null;

    constructor(private _containerClientRetentionKpisService: ContainerClientRetentionKpisService) { }

    ngOnChanges(changes: SimpleChanges): void {
        this.model.loadRangeDates(changes.range.currentValue);
        this._loadWorkspaceRetentionRate(changes.range.currentValue);
        this._loadWorkspaceHigherRetentionRate(changes.range.currentValue);
        this._loadWorkspaceLowerRetentionRate(changes.range.currentValue);
        this._loadTotalLossClients(changes.range.currentValue);
    }

    ngOnInit(): void {
    }

    get model(): ContainerClientRetentionKpisService {
        return this._containerClientRetentionKpisService;
    }

    private _loadWorkspaceRetentionRate(range: RangeData): void {
        this.model.getWorkspaceRetentionRate(range).subscribe((res: number[]) => {
            this.model.loadWorkspaceRetentionRate(res);
        });
    }

    private _loadWorkspaceHigherRetentionRate(range: RangeData): void {
        this.model.getWorkspaceHigherRetentionRate(range).subscribe((res: number[]) => {
            this.model.loadWorkspaceHigherRetentionRate(res);
        });
    }

    private _loadWorkspaceLowerRetentionRate(range: RangeData): void {
        this.model.getWorkspaceLowerRetentionRate(range).subscribe((res: number[]) => {
            this.model.loadWorkspaceLowerRetentionRate(res);
        });
    }

    private _loadTotalLossClients(range: RangeData): void {
        this.model.getTotalClients().subscribe((totalClients: number) => {
            this.model.getTotalLossClients(range).subscribe((res: number[]) => {
                this.model.loadTotalLossClients(totalClients, res);
            });
        })
    }

}
