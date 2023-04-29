import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';

import { ChartHelper } from '@helpers/chart.helper';
import { HttpResponse } from '@core/interfaces/http-response.interface';
import { ComparisonRangeData } from '@interfaces/comparison-range-data.interface';
import { StatRangeData } from '@interfaces/stat-range-data.interface';
import { ReceiptPaidService } from '@services/receipt-paid.service';
import { WorkspaceService } from '@core/services/workspace/workspace.service';
import { Workspace } from '@core/interfaces/workspace.interface';

@Injectable()
export class ChartAppliedPaymentsService {
    appliedPaymentsStatsData: any[] = [];
    workspaceCurrencyName: string = '';

    constructor(
        private _receiptPaidService: ReceiptPaidService,
        private _workspaceService: WorkspaceService
    ) {}

    loadWorkspaceCurrencyName(): void {
        const fields: string = 'currencyName';
        this._workspaceService
            .getWorkspace(fields)
            .subscribe((res: Workspace) => {
                this.workspaceCurrencyName = res.currencyName;
            });
    }

    getAppliedPaymentsStats(
        range: ComparisonRangeData
    ): Observable<StatRangeData[][]> {
        this.appliedPaymentsStatsData = [];
        const rangeField: string = 'applicationDate';
        let requests: Observable<StatRangeData[]>[] = [];
        requests.push(
            this._receiptPaidService.getAppliedPaymentsStats(
                rangeField,
                range.selectedRangeStart,
                range.selectedRangeEnd
            )
        );
        requests.push(
            this._receiptPaidService.getAppliedPaymentsStats(
                rangeField,
                range.comparedRangeStart,
                range.comparedRangeEnd
            )
        );
        return forkJoin(requests);
    }

    loadAppliedPaymentsStatsData(
        appliedPaymentsStats: StatRangeData[][]
    ): void {
        const headerData: any[] = [
            ['Cobranza', 'Periodo Seleccionado', 'Periodo Comparación'],
        ];
        this.appliedPaymentsStatsData = ChartHelper.generateChartDataByRanges(
            appliedPaymentsStats,
            headerData
        );
    }
}
