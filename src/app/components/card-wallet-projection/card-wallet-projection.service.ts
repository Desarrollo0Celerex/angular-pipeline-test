import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';

import { UtilitiesHelper } from '@helpers/utilities.helper';
import { HttpResponse } from '@interfaces/http-response.interface';
import { ContactService } from '@services/contact.service';

@Injectable()
export class CardWalletProjectionService {
    chartData: any = [['AÑO', 'Prima Anual']];

    constructor(private _contactService: ContactService) { }

    /**
     * Load the chart data
     * @param contactId The contact ID
     */
    loadChartData(contactId: string): Observable<void> {
        this.chartData = [['AÑO', 'Prima Anual']];
        return new Observable((observer: any) => {
            this._getContact(contactId).subscribe((res: HttpResponse) => {
                if(!!res.data.oldestActivePolicyDate && !!res.data.farthestActivePolicyDate) {
                    const startYear: number = UtilitiesHelper.getYearFromDate(res.data.oldestActivePolicyDate);
                    const endYear: number = UtilitiesHelper.getYearFromDate(res.data.farthestActivePolicyDate);
                    this.getRequestToGetAnnualwallet(contactId, startYear, endYear).subscribe((res: HttpResponse[]) => {
                        let index: number = 0;
                        for(let i = startYear; i<= endYear; i++) {
                            const year: string = i.toString();
                            const value: number = parseFloat(parseFloat(res[index].data.totalAnnualWallet).toFixed(2));
                            this.chartData[0][1] = 'Prima Anual ('+res[index].data.currencyName+')';
                            this.chartData.push([year, value]);
                            index++;
                        }
                        observer.next();
                        observer.complete();
                    });
                } else {
                    const year: number = UtilitiesHelper.getCurrentYear();
                    this.chartData.push([year.toString(), 0]);
                    observer.next();
                    observer.complete();
                }
            });
        });
    }

    /**
     * Get the contact
     * @param  contactId The contactId
     * @return           The contact
     */
    private _getContact(contactId: string): Observable<HttpResponse> {
        const fields: string = 'oldestActivePolicyDate,farthestActivePolicyDate';
        return this._contactService.getContact(contactId, fields);
    }

    private getRequestToGetAnnualwallet(contactId: string, startYear: number, endYear: number): Observable<HttpResponse[]> {
        const fields: string = 'totalAnnualWallet,currencyName';
        let requests: Observable<HttpResponse>[] = [];
        for(let i = startYear; i<= endYear; i++) {
            let request: Observable<HttpResponse> = this._contactService.getContactAnnualWallet(contactId, i, fields);
            requests.push(request);
        }
        return forkJoin(requests);
    }
}
