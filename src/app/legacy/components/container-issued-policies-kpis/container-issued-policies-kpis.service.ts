import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';

import { PERIOD_STATUS, POLICY_SOURCES } from '@constants/global';
import { UtilitiesHelper } from '@core/helpers/utilities.helper';
import { KpiOne } from '@interfaces/kpi-one.interface';
import { ComparisonRangeData } from '@interfaces/comparison-range-data.interface';
import { PolicyService } from '@services/policy.service';

const NEW_POLICIES: number = 0;
const RENEWED_POLICIES: number = 1;
const TOTAL_POLICIES: number = 2;

@Injectable()
export class ContainerIssuedPoliciesKpisService {
    kpis: KpiOne[] = [
        {
            contentName: 'Pólizas',
            subcontentName: 'Nuevas',
            description:
                'Permite identificar el número de pólizas emitidas por nuevos negocios.',
            totalContents: 0,
            selectedValue: 0,
            selectedRange: '',
            comparedValue: 0,
            comparedRange: '',
        },
        {
            contentName: 'Pólizas',
            subcontentName: 'Renovadas',
            description:
                'Permite identificar el número de pólizas emitidas por renovación.',
            totalContents: 0,
            selectedValue: 0,
            selectedRange: '',
            comparedValue: 0,
            comparedRange: '',
        },
        {
            contentName: 'Emisiones',
            subcontentName: 'Totales',
            description:
                'Permite identificar el número de pólizas emitidas en total.',
            totalContents: 0,
            selectedValue: 0,
            selectedRange: '',
            comparedValue: 0,
            comparedRange: '',
        },
    ];

    constructor(private _policyService: PolicyService) {}

    getAllTotalWorkspacePolicies(): Observable<number> {
        return this._policyService.getTotalWorkspacePolicies();
    }

    getTotalWorkspacePolicies(
        range: ComparisonRangeData
    ): Observable<number[]> {
        return this._getWorkspacePolicies(range, '');
    }

    getTotalWorkspaceNewPolicies(
        range: ComparisonRangeData
    ): Observable<number[]> {
        const filters: string = UtilitiesHelper.generateHttpFilter(
            'policySourceId',
            [POLICY_SOURCES.NEW]
        );
        return this._getWorkspacePolicies(range, filters);
    }

    getTotalWorkspaceRenewalsApplied(
        range: ComparisonRangeData
    ): Observable<number[]> {
        const filters: string = UtilitiesHelper.generateHttpFilter(
            'policySourceId',
            [
                POLICY_SOURCES.RENEWAL,
                POLICY_SOURCES.REISSUE,
                POLICY_SOURCES.HISTORY,
            ]
        );
        return this._getWorkspacePolicies(range, filters);
    }

    loadAllTotalWorkspacePolicies(totalPolicies: number): void {
        this.kpis[NEW_POLICIES].totalContents = totalPolicies;
        this.kpis[RENEWED_POLICIES].totalContents = totalPolicies;
        this.kpis[TOTAL_POLICIES].totalContents = totalPolicies;
    }

    loadTotalWorkspaceNewPolicies(newPolicies: number[]): void {
        this.kpis[NEW_POLICIES].selectedValue =
            newPolicies[PERIOD_STATUS.SELECTED];
        this.kpis[NEW_POLICIES].comparedValue =
            newPolicies[PERIOD_STATUS.COMPARED];
    }

    loadTotalWorkspaceRenewedPolicies(renewedPolicies: number[]): void {
        this.kpis[RENEWED_POLICIES].selectedValue =
            renewedPolicies[PERIOD_STATUS.SELECTED];
        this.kpis[RENEWED_POLICIES].comparedValue =
            renewedPolicies[PERIOD_STATUS.COMPARED];
    }

    loadTotalWorkspacePolicies(totalPolicies: number[]): void {
        this.kpis[TOTAL_POLICIES].selectedValue =
            totalPolicies[PERIOD_STATUS.SELECTED];
        this.kpis[TOTAL_POLICIES].comparedValue =
            totalPolicies[PERIOD_STATUS.COMPARED];
    }

    resetKpis(range: ComparisonRangeData): void {
        for (let index in this.kpis) {
            this.kpis[index].selectedValue = 0;
            this.kpis[index].selectedRange =
                range.selectedRangeStart + ' - ' + range.selectedRangeEnd;
            this.kpis[index].comparedValue = 0;
            this.kpis[index].comparedRange =
                range.comparedRangeStart + ' - ' + range.comparedRangeEnd;
        }
    }

    private _getWorkspacePolicies(
        range: ComparisonRangeData,
        filters: string = ''
    ): Observable<number[]> {
        const rangeField: string = 'validityStartDate';
        let requests: Observable<number>[] = [];
        requests.push(
            this._policyService.getTotalWorkspacePolicies(
                filters,
                rangeField,
                range.selectedRangeStart,
                range.selectedRangeEnd
            )
        );
        requests.push(
            this._policyService.getTotalWorkspacePolicies(
                filters,
                rangeField,
                range.comparedRangeStart,
                range.comparedRangeEnd
            )
        );
        return forkJoin(requests);
    }
}
