import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

import { ComparisonRangeData } from '@interfaces/comparison-range-data.interface';

import { ContainerClientClientsKpisService } from './container-client-clients-kpis.service';

@Component({
    selector: 'agt-container-client-clients-kpis',
    templateUrl: './container-client-clients-kpis.component.html',
    styles: [],
    providers: [ContainerClientClientsKpisService],
    standalone: false
})
export class ContainerClientClientsKpisComponent implements OnChanges, OnInit {
    @Input() range: ComparisonRangeData | null = null;

    constructor(private _containerClientClientsKpiService: ContainerClientClientsKpisService) { }

    ngOnChanges(changes: SimpleChanges): void {
        this.model.loadRangeDates(changes.range.currentValue);
        this._loadTotalActiveInsurances(changes.range.currentValue);
        this._loadTotalActiveInsurers(changes.range.currentValue);
        this._loadTotalGeneratedClients(changes.range.currentValue);
    }

    ngOnInit(): void {
        this._loadTotalWorkspaceActiveInsurances();
        this._loadTotalWorkspaceActiveInsurers();
        this._loadTotalWorkspaceGeneratedClients();
    }

    get model(): ContainerClientClientsKpisService {
        return this._containerClientClientsKpiService;
    }

    private _loadTotalActiveInsurances(range: ComparisonRangeData): void {
        this.model.getTotalActiveInsurances(range).subscribe((total: number[]) => {
            this.model.loadTotalActiveInsurances(total);
        });
    }

    private _loadTotalWorkspaceActiveInsurances(): void {
        this.model.getTotalWorkspaceActiveInsurances().subscribe((total: number) => {
            this.model.loadTotalWorkspaceActiveInsurances(total);
        });
    }

    private _loadTotalActiveInsurers(range: ComparisonRangeData): void {
        this.model.getTotalActiveInsurers(range).subscribe((total: number[]) => {
            this.model.loadTotalActiveInsurers(total);
        });
    }

    private _loadTotalWorkspaceActiveInsurers(): void {
        this.model.getTotalWorkspaceActiveInsurers().subscribe((total: number) => {
            this.model.loadTotalWorkspaceActiveInsurers(total);
        });
    }

    private _loadTotalGeneratedClients(range: ComparisonRangeData): void {
        this.model.getTotalGeneratedClients(range).subscribe((totals: number[]) => {
            this.model.loadTotalGeneratedClients(totals);
            this.model.loadDailyAverage(totals, range);
        });
    }

    private _loadTotalWorkspaceGeneratedClients(): void {
        this.model.getTotalWorkspaceGeneratedClients().subscribe((total: number) => {
            this.model.loadTotalWorkspaceGeneratedClients(total);
        });
    }
}
