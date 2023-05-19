import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpResponse } from '@core/interfaces/http-response.interface';
import { PartnerService } from '@services/partner.service';

@Injectable()
export class ChartPartnerGlobalBalanceService {
    chartData: any[] = [['Task', 'Balance']];

    constructor(private _partnerService: PartnerService) {}

    /**
     * Load the char data
     * @param  partnerId The partner ID
     * @return           Notification of action done
     */
    loadChartData(partnerId: number): Observable<void> {
        this.chartData = [['Task', 'Balance']];
        return new Observable((observer: any) => {
            const fields: string =
                'totalGlobalWallet,totalGlobalWalletPaid,currencyName';
            this._partnerService
                .getPartner(partnerId, fields)
                .subscribe((res: HttpResponse) => {
                    const walletPaid: number = parseFloat(
                        parseFloat(res.data.totalGlobalWalletPaid).toFixed(2)
                    );
                    const walletPending: number = parseFloat(
                        (
                            res.data.totalGlobalWallet -
                            res.data.totalGlobalWalletPaid
                        ).toFixed(2)
                    );
                    this.chartData.push([
                        'Pagado (' + res.data.currencyName + ')',
                        walletPaid,
                    ]);
                    this.chartData.push([
                        'Pendiente (' + res.data.currencyName + ')',
                        walletPending,
                    ]);
                    observer.next();
                    observer.complete();
                });
        });
    }
}
