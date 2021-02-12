import { Injectable } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';

import { HttpResponse } from '@interfaces/http-response.interface';
import { LeadStatus } from '@interfaces/lead-status.interface';
import { LeadService } from '@services/lead.service';
import { LeadStatusService } from '@services/lead-status.service';

import { Kpi } from '@interfaces/kpi.interface';

@Injectable()
export class ContentKpisService {
    kpis: Kpi[];

    constructor(
        private _leadService: LeadService,
        private _leadStatusService: LeadStatusService
    ) {
        this.kpis = this._buildKpis();
    }

    /**
     * Initialize the kpis
     */
    initKpis(): void {
        this.kpis = this._buildKpis();
    }

    /**
     * Load the lead kpis
     * @return Notice of action done
     */
    loadLeadKpis(): Observable<void> {
        return new Observable( observer => {
            const fields: string = 'leadStatusId,name,background,icon';
            this._leadStatusService.getLeadStatus(fields).subscribe( (res: HttpResponse) => {
                const leadStatus: LeadStatus[] = res.data;
                this._leadService.getTotalLeads().subscribe( (res: HttpResponse) => {
                    const totalLeads: number = res.data;
                    this._getTotalLeadsByStatus(leadStatus).subscribe( (res: HttpResponse[]) => {
                        this.kpis = [];
                        for(let index in res) {
                            const kpi: Kpi = {
                                contentSubtype: leadStatus[index].leadStatusId,
                                name: leadStatus[index].name,
                                background: leadStatus[index].background,
                                icon: leadStatus[index].icon,
                                total: res[index].data,
                                percentage: res[index].data / totalLeads
                            }
                            this.kpis.push(kpi);
                        }
                        observer.next();
                        observer.complete();
                    })
                });
            })
        })
    }

    /**
     * Build the kpis
     * @return The kpis
     */
    private _buildKpis(): Kpi[] {
        let kpis: Kpi[] = [];
        for(let i=0; i<4; i++) {
            kpis.push({
                contentSubtype: 0,
                name: '',
                background: '',
                icon: '',
                total: 0,
                percentage: 0
            });
        }
        return kpis;
    }

    /**
     * Get the requests to get the total leads by status
     * @param  leadStatus The lead status
     * @return            The requests
     */
    private _getTotalLeadsByStatus(leadStatus: LeadStatus[]): Observable<HttpResponse[]> {
        let requests: Observable<HttpResponse>[] = [];
        for(let status of leadStatus) {
            requests.push(this._leadService.getTotalLeads(status.leadStatusId));
        }
        return forkJoin(requests);
    }
}
