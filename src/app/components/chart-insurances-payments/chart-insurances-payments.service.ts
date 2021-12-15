import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';

import { PAYMENT_STATUS } from '@constants/global';
import { UtilitiesHelper } from '@helpers/utilities.helper';
import { RangeData } from '@interfaces/range-data.interface';
import { Stat } from '@interfaces/stat.interface';
import { PaymentService } from '@services/payment.service';

@Injectable()
export class ChartInsurancesPaymentsService {
    insurancesPaymentsStatsData: any[] = [];

    constructor(private _paymentService: PaymentService) { }

    getInsurancesPaymentsStats(range: RangeData): Observable<Stat[][]> {
        this.insurancesPaymentsStatsData = [];
        const filters: string = UtilitiesHelper.generateHttpFilter('paymentStatusId', [PAYMENT_STATUS.INTIME, PAYMENT_STATUS.PENDING, PAYMENT_STATUS.LATE, PAYMENT_STATUS.OVERDUE]);
        const rangeField: string = 'paymentDate';
        let requests: Observable<Stat[]>[] = [];
        requests.push(this._paymentService.getInsurancesPaymentsStats(filters, rangeField, range.selectedRangeStart, range.selectedRangeEnd));
        requests.push(this._paymentService.getInsurancesPaymentsStats(filters, rangeField, range.comparedRangeStart, range.comparedRangeEnd));
        return forkJoin(requests);
    }

    loadInsurancesPaymentsStatsData(insurancesPaymentsStats: Stat[][]): void {
        let data: any[] = [];
        for (let contactSourceStats of insurancesPaymentsStats[0]) {
                data.push([contactSourceStats.name]);
        }
        for (let index in insurancesPaymentsStats[0]) {
            for (let contactSourceStats of insurancesPaymentsStats) {
                data[parseInt(index)].push(contactSourceStats[index].value);
            }
        }
        this.insurancesPaymentsStatsData = this._calculateTop3(data);
        this.insurancesPaymentsStatsData.unshift(['Canales', 'Periodo Seleccionado', 'Periodo Comparación']);
    }

    private _calculateTop3(data: any[]): any[] {
        data.sort((a, b) => {
            return b[1] - a[1];
        });
        return data.slice(0, 3);
    }
}
