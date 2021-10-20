import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

import { RangeData } from '@interfaces/range-data.interface';

import { ContainerClientClientsKpisService } from './container-client-clients-kpis.service';

@Component({
  selector: 'agt-container-client-clients-kpis',
  templateUrl: './container-client-clients-kpis.component.html',
  styles: [
  ],
  providers: [ContainerClientClientsKpisService]
})
export class ContainerClientClientsKpisComponent implements OnChanges, OnInit {
    @Input() range: RangeData | null = null;

    constructor(private _containerClientClientsKpiService: ContainerClientClientsKpisService) { }

    ngOnChanges(changes: SimpleChanges): void {
        this.model.loadRangeDates(changes.range.currentValue);
        this._loadActiveInsurances(changes.range.currentValue);
    }

    ngOnInit(): void {
        this._loadTotalActiveInsurances();
    }

    get model(): ContainerClientClientsKpisService {
        return this._containerClientClientsKpiService;
    }

    private _loadActiveInsurances(range: RangeData): void {
        this.model.getTotalActiveInsurances(range).subscribe((totalActiveInsurances: number[]) => {
            this.model.loadActiveInsurances(totalActiveInsurances);
        });
    }

    private _loadTotalActiveInsurances(): void {
        this.model.getTotalWorkspaceActiveInsurances().subscribe((totalWorkspaceActiveInsurances: number) => {
            this.model.loadTotalActiveInsurances(totalWorkspaceActiveInsurances);
        });
    }
}
