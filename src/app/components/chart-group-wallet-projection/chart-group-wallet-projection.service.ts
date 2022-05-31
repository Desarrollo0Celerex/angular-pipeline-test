import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';

import { UtilitiesHelper } from '@helpers/utilities.helper';
import { HttpResponse } from '@interfaces/http-response.interface';
import { GroupService } from '@services/group.service';

@Injectable()
export class ChartGroupWalletProjectionService {
    chartData: any = [['AÑO', 'Prima Anual']];

    constructor(private _groupService: GroupService) { }

    /**
     * Load the chart data
     * @param groupId The group ID
     */
    loadChartData(groupId: string): Observable<void> {
        this.chartData = [['AÑO', 'Prima Anual']];
        return new Observable((observer: any) => {
            this._getGroup(groupId).subscribe((res: HttpResponse) => {
                if(!!res.data.oldestActivePolicyDate && !!res.data.farthestActivePolicyDate) {
                    const startYear: number = UtilitiesHelper.getYearFromDate(res.data.oldestActivePolicyDate);
                    const endYear: number = UtilitiesHelper.getYearFromDate(res.data.farthestActivePolicyDate);
                    this.getRequestToGetAnnualwallet(groupId, startYear, endYear).subscribe((res: HttpResponse[]) => {
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
     * Get the group
     * @param  groupId The groupId
     * @return           The group
     */
    private _getGroup(groupId: string): Observable<HttpResponse> {
        const fields: string = 'oldestActivePolicyDate,farthestActivePolicyDate';
        return this._groupService.getGroup(groupId, fields);
    }

    private getRequestToGetAnnualwallet(groupId: string, startYear: number, endYear: number): Observable<HttpResponse[]> {
        const fields: string = 'totalAnnualWallet,currencyName';
        let requests: Observable<HttpResponse>[] = [];
        for(let i = startYear; i<= endYear; i++) {
            let request: Observable<HttpResponse> = this._groupService.getGroupAnnualWallet(groupId, i, fields);
            requests.push(request);
        }
        return forkJoin(requests);
    }
}
