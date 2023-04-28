import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpResponse } from '@core/interfaces/http-response.interface';
import { GroupService } from '@services/group.service';

@Injectable()
export class ChartGroupGlobalBalanceService {
    chartData: any[] = [['Task', 'Balance']];

    constructor(private _groupService: GroupService) {}

    /**
     * Load the char data
     * @param  groupId The group ID
     * @return           Notification of action done
     */
    loadChartData(groupId: string): Observable<void> {
        this.chartData = [['Task', 'Balance']];
        return new Observable((observer: any) => {
            const fields: string =
                'totalGlobalWallet,totalGlobalWalletPaid,currencyName';
            this._groupService
                .getGroup(groupId, fields)
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
