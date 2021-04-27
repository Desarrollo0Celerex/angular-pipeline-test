import { Injectable } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';

import { HttpResponse } from '@interfaces/http-response.interface';
import { ClientStatus } from '@interfaces/client-status.interface';
import { LeadStatus } from '@interfaces/lead-status.interface';
import { PaymentStatus } from '@interfaces/payment-status.interface';
import { ClientService } from '@services/client.service';
import { ClientStatusService } from '@services/client-status.service';
import { LeadService } from '@services/lead.service';
import { LeadStatusService } from '@services/lead-status.service';
import { PaymentService } from '@services/payment.service';
import { PaymentStatusService } from '@services/payment-status.service';

import { Kpi } from '@interfaces/kpi.interface';

@Injectable()
export class ContentKpisService {
    kpis: Kpi[];

    constructor(
        private _clientService: ClientService,
        private _clientStatusService: ClientStatusService,
        private _leadService: LeadService,
        private _leadStatusService: LeadStatusService,
        private _paymentService: PaymentService,
        private _paymentStatusService: PaymentStatusService
    ) {
        this.kpis = this._buildKpis();
    }

    /**
     * Get the content subtype name
     * @param  contentSubtype The selected content subtype
     * @return                The content subtype name
     */
    getContentSubtypeName(contentSubtype: number): string {
        const selectedKpi: Kpi | undefined = this.kpis.find( (element: Kpi) => element.contentSubtype === contentSubtype)
        return (!!selectedKpi) ? selectedKpi.name : '';
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
     * Load the clients kpis
     * @return Notice of action done
     */
    loadClientKpis(): Observable<void> {
        return new Observable( observer => {
            const fields: string = 'clientStatusId,name,background,icon';
            this._clientStatusService.getClientStatus(fields).subscribe( (res: HttpResponse) => {
                const clientStatus: ClientStatus[] = res.data;
                this._clientService.getTotalClients().subscribe( (res: HttpResponse) => {
                    const totalClients: number = res.data;
                    this._getTotalClientsByStatus(clientStatus).subscribe( (res: HttpResponse[]) => {
                        this.kpis = [];
                        for(let index in res) {
                            const kpi: Kpi = {
                                contentSubtype: clientStatus[index].clientStatusId,
                                name: clientStatus[index].name,
                                background: clientStatus[index].background,
                                icon: clientStatus[index].icon,
                                total: res[index].data,
                                percentage: res[index].data / totalClients
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
     * Load the payment kpis
     * @return Notice of action done
     */
    loadPaymentKpis(): Observable<void> {
        return new Observable( observer => {
            const fields: string = 'paymentStatusId,name,background,icon';
            this._paymentStatusService.getPaymentStatus(fields).subscribe( (res: HttpResponse) => {
                const paymentStatus: PaymentStatus[] = res.data;
                this._clientService.getTotalClients().subscribe( (res: HttpResponse) => {
                    const totalPayments: number = res.data;
                    this._getTotalPaymentsByStatus(paymentStatus).subscribe( (res: HttpResponse[]) => {
                        this.kpis = [];
                        for(let index in res) {
                            const kpi: Kpi = {
                                contentSubtype: paymentStatus[index].paymentStatusId,
                                name: paymentStatus[index].name,
                                background: paymentStatus[index].background,
                                icon: paymentStatus[index].icon,
                                total: res[index].data,
                                percentage: res[index].data / totalPayments
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
     * Get the requests to get the total clients by status
     * @param  clientStatus The client status
     * @return            The requests
     */
    private _getTotalClientsByStatus(clientStatus: ClientStatus[]): Observable<HttpResponse[]> {
        let requests: Observable<HttpResponse>[] = [];
        for(let status of clientStatus) {
            requests.push(this._clientService.getTotalClients(status.clientStatusId));
        }
        return forkJoin(requests);
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

    /**
     * Get the requests to get the total payments by status
     * @param  leadStatus The payment status
     * @return            The requests
     */
    private _getTotalPaymentsByStatus(paymentStatus: PaymentStatus[]): Observable<HttpResponse[]> {
        let requests: Observable<HttpResponse>[] = [];
        for(let status of paymentStatus) {
            requests.push(this._paymentService.getTotalPayments(status.paymentStatusId));
        }
        return forkJoin(requests);
    }
}
