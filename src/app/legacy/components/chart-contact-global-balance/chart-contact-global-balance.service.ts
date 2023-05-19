import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpResponse } from '@core/interfaces/http-response.interface';
import { ContactService } from '@core/services/contact/contact.service';
import { Contact } from '@core/interfaces/contact.interface';

@Injectable()
export class ChartContactGlobalBalanceService {
    chartData: any[] = [['Task', 'Balance']];

    constructor(private _contactService: ContactService) {}

    /**
     * Load the char data
     * @param  contactId The contact ID
     * @return           Notification of action done
     */
    loadChartData(contactId: string): Observable<void> {
        this.chartData = [['Task', 'Balance']];
        return new Observable((observer: any) => {
            const fields: string =
                'totalGlobalWallet,totalGlobalWalletPaid,currencyName';
            this._contactService
                .getContact(contactId, fields)
                .subscribe((res: Contact) => {
                    const walletPaid: number = parseFloat(
                        parseFloat(
                            res.totalGlobalWalletPaid.toString()
                        ).toFixed(2)
                    );
                    const walletPending: number = parseFloat(
                        (
                            res.totalGlobalWallet - res.totalGlobalWalletPaid
                        ).toFixed(2)
                    );
                    this.chartData.push([
                        'Pagado (' + res.currencyName + ')',
                        walletPaid,
                    ]);
                    this.chartData.push([
                        'Pendiente (' + res.currencyName + ')',
                        walletPending,
                    ]);
                    observer.next();
                    observer.complete();
                });
        });
    }
}
