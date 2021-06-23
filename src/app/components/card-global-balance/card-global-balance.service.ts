import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpResponse } from '@interfaces/http-response.interface';
import { ContactService } from '@services/contact.service';

@Injectable()
export class CardGlobalBalanceService {
    chartData: any[] = [['Task', 'Balance']];

    constructor(private _contactService: ContactService) { }

    /**
     * Load the char data
     * @param  contactId The contact ID
     * @return           Notification of action done
     */
    loadChartData(contactId: string): Observable<void> {
        return new Observable((observer: any) => {
            const fields: string = 'totalGlobalWallet,totalGlobalWalletPaid';
            this._contactService.getContact(contactId, fields).subscribe((res: HttpResponse) => {
                const walletPaid: number = parseFloat(parseFloat(res.data.totalGlobalWalletPaid).toFixed(2));
                const walletPending: number = parseFloat((res.data.totalGlobalWallet - res.data.totalGlobalWalletPaid).toFixed(2));
                this.chartData.push(['Pagado (MXN)', walletPaid]);
                this.chartData.push(['Pendiente (MXN)', walletPending]);
                observer.next();
                observer.complete();
            })
        });
    }

}
