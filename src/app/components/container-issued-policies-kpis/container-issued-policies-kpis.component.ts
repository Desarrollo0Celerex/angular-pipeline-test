import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { ComparisonRangeData } from '@interfaces/comparison-range-data.interface';

import { ContainerIssuedPoliciesKpisService } from './container-issued-policies-kpis.service';

@Component({
  selector: 'agt-container-issued-policies-kpis',
  templateUrl: './container-issued-policies-kpis.component.html',
  styles: [
  ],
  providers: [ContainerIssuedPoliciesKpisService]
})
export class ContainerIssuedPoliciesKpisComponent implements OnChanges {
    @Input() range: ComparisonRangeData | null = null;

    constructor(private _containerPolicyEmissionKpisService: ContainerIssuedPoliciesKpisService) { }

    ngOnChanges(changes: SimpleChanges): void {
        this.model.resetKpis(changes.range.currentValue);
        this._loadAllTotalWorkspacePolicies();
        this._loadTotalWorkspacePolicies(changes.range.currentValue);
        this._loadTotalWorkspaceNewPolicies(changes.range.currentValue);
        this._loadTotalWorkspaceRenewedPolicies(changes.range.currentValue);
    }

    get model(): ContainerIssuedPoliciesKpisService {
        return this._containerPolicyEmissionKpisService;
    }

    private _loadAllTotalWorkspacePolicies(): void {
        this.model.getAllTotalWorkspacePolicies().subscribe((res: number) => {
            this.model.loadAllTotalWorkspacePolicies(res);
        })
    }

    private _loadTotalWorkspacePolicies(range: ComparisonRangeData): void {
        this.model.getTotalWorkspacePolicies(range).subscribe((res: number[]) => {
            this.model.loadTotalWorkspacePolicies(res);
        })
    }

    private _loadTotalWorkspaceNewPolicies(range: ComparisonRangeData): void {
        this.model.getTotalWorkspaceNewPolicies(range).subscribe((res: number[]) => {
            this.model.loadTotalWorkspaceNewPolicies(res);
        })
    }

    private _loadTotalWorkspaceRenewedPolicies(range: ComparisonRangeData): void {
        this.model.getTotalWorkspaceRenewalsApplied(range).subscribe((res: number[]) => {
            this.model.loadTotalWorkspaceRenewedPolicies(res);
        })
    }

}
