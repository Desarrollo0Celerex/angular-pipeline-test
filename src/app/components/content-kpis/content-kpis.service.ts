import { Injectable } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';

import { CLIENT_STATUS, LEAD_STATUS, PARTNER_STATUS } from '@constants/global';
import { UtilitiesHelper } from '@helpers/utilities.helper';
import { HttpResponse } from '@interfaces/http-response.interface';
import { ClientStatus } from '@interfaces/client-status.interface';
import { LeadStatus } from '@interfaces/lead-status.interface';
import { PartnerStatus } from '@interfaces/partner-status.interface';
import { PaymentStatus } from '@interfaces/payment-status.interface';
import { SinisterStatus } from '@interfaces/sinister-status.interface';
import { ClientService } from '@services/client.service';
import { ClientStatusService } from '@services/client-status.service';
import { LeadService } from '@services/lead.service';
import { LeadStatusService } from '@services/lead-status.service';
import { PartnerService } from '@services/partner.service';
import { PartnerStatusService } from '@services/partner-status.service';
import { PaymentService } from '@services/payment.service';
import { PaymentStatusService } from '@services/payment-status.service';
import { SinisterService } from '@services/sinister.service';
import { SinisterStatusService } from '@services/sinister-status.service';

import { Kpi } from '@interfaces/kpi.interface';

@Injectable()
export class ContentKpisService {
    kpis: Kpi[];

    constructor(
        private _clientService: ClientService,
        private _clientStatusService: ClientStatusService,
        private _leadService: LeadService,
        private _leadStatusService: LeadStatusService,
        private _partnerService: PartnerService,
        private _partnerStatusService: PartnerStatusService,
        private _paymentService: PaymentService,
        private _paymentStatusService: PaymentStatusService,
        private _sinisterService: SinisterService,
        private _sinisterStatusService: SinisterStatusService
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
                const filters: string = UtilitiesHelper.generateHttpFilter('leadStatusId', [LEAD_STATUS.NEW, LEAD_STATUS.RECURRENT, LEAD_STATUS.RECOVERED, LEAD_STATUS.DISCARDED])
                this._leadService.getTotalLeads(filters).subscribe( (res: number) => {
                    const totalLeads: number = res;
                    this._getTotalLeadsByStatus(leadStatus).subscribe( (res: number[]) => {
                        this.kpis = [];
                        for(let index in res) {
                            const kpi: Kpi = {
                                contentSubtype: leadStatus[index].leadStatusId,
                                name: leadStatus[index].name,
                                background: leadStatus[index].background,
                                icon: leadStatus[index].icon,
                                total: res[index],
                                percentage: res[index] / totalLeads
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
                const filters: string = UtilitiesHelper.generateHttpFilter('clientStatusId', [CLIENT_STATUS.OCCASIONAL, CLIENT_STATUS.FREQUENT, CLIENT_STATUS.INFLUENTIAL, CLIENT_STATUS.LOST])
                this._clientService.getTotalClients(filters).subscribe( (res: number) => {
                    const totalClients: number = res;
                    this._getTotalClientsByStatus(clientStatus).subscribe( (res: number[]) => {
                        this.kpis = [];
                        for(let index in res) {
                            const kpi: Kpi = {
                                contentSubtype: clientStatus[index].clientStatusId,
                                name: clientStatus[index].name,
                                background: clientStatus[index].background,
                                icon: clientStatus[index].icon,
                                total: res[index],
                                percentage: res[index] / totalClients
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
     * Load the partner kpis
     * @return Notice of action done
     */
    loadPartnerKpis(): Observable<void> {
        return new Observable( observer => {
            const fields: string = 'partnerStatusId,name,background,icon';
            this._partnerStatusService.getPartnerStatus(fields).subscribe( (res: HttpResponse) => {
                const partnerStatus: PartnerStatus[] = res.data;
                const filters: string = UtilitiesHelper.generateHttpFilter('partnerStatusId', [PARTNER_STATUS.OCCASIONAL, PARTNER_STATUS.FREQUENT, PARTNER_STATUS.INFLUENTIAL, PARTNER_STATUS.INACTIVE])
                this._partnerService.getTotalPartners(filters).subscribe( (res: number) => {
                    const totalPartners: number = res;
                    this._getTotalPartnersByStatus(partnerStatus).subscribe( (res: number[]) => {
                        this.kpis = [];
                        for(let index in res) {
                            const kpi: Kpi = {
                                contentSubtype: partnerStatus[index].partnerStatusId,
                                name: partnerStatus[index].name,
                                background: partnerStatus[index].background,
                                icon: partnerStatus[index].icon,
                                total: res[index],
                                percentage: res[index] / totalPartners
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
                this._paymentService.getTotalPayments().subscribe( (res: number) => {
                    const totalPayments: number = res;
                    this._getTotalPaymentsByStatus(paymentStatus).subscribe( (res: number[]) => {
                        this.kpis = [];
                        for(let index in res) {
                            const kpi: Kpi = {
                                contentSubtype: paymentStatus[index].paymentStatusId,
                                name: paymentStatus[index].name,
                                background: paymentStatus[index].background,
                                icon: paymentStatus[index].icon,
                                total: res[index],
                                percentage: res[index] / totalPayments
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
     * Load the sinister kpis
     * @return Notice of action done
     */
    loadSinisterKpis(): Observable<void> {
        return new Observable( observer => {
            const fields: string = 'sinisterStatusId,name,background,icon';
            this._sinisterStatusService.getSinisterStatus(fields).subscribe( (res: HttpResponse) => {
                const sinisterStatus: SinisterStatus[] = res.data;
                this._sinisterService.getTotalSinisters().subscribe( (res: HttpResponse) => {
                    const totalSinisters: number = res.data;
                    this._getTotalSinistersByStatus(sinisterStatus).subscribe( (res: HttpResponse[]) => {
                        this.kpis = [];
                        for(let index in res) {
                            const kpi: Kpi = {
                                contentSubtype: sinisterStatus[index].sinisterStatusId,
                                name: sinisterStatus[index].name,
                                background: sinisterStatus[index].background,
                                icon: sinisterStatus[index].icon,
                                total: res[index].data,
                                percentage: res[index].data / totalSinisters
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
    private _getTotalClientsByStatus(clientStatus: ClientStatus[]): Observable<number[]> {
        let requests: Observable<number>[] = [];
        for(let status of clientStatus) {
            const filters: string = UtilitiesHelper.generateHttpFilter('clientStatusId', [status.clientStatusId])
            requests.push(this._clientService.getTotalClients(filters));
        }
        return forkJoin(requests);
    }

    /**
     * Get the requests to get the total leads by status
     * @param  leadStatus The lead status
     * @return            The requests
     */
    private _getTotalLeadsByStatus(leadStatus: LeadStatus[]): Observable<number[]> {
        let requests: Observable<number>[] = [];
        for(let status of leadStatus) {
            const filters: string = UtilitiesHelper.generateHttpFilter('leadStatusId', [status.leadStatusId])
            requests.push(this._leadService.getTotalLeads(filters));
        }
        return forkJoin(requests);
    }

    /**
     * Get the requests to get the total partners by status
     * @param  partnerStatus The partner status
     * @return            The requests
     */
    private _getTotalPartnersByStatus(partnerStatus: PartnerStatus[]): Observable<number[]> {
        let requests: Observable<number>[] = [];
        for(let status of partnerStatus) {
            const filters: string = UtilitiesHelper.generateHttpFilter('partnerStatusId', [status.partnerStatusId])
            requests.push(this._partnerService.getTotalPartners(filters));
        }
        return forkJoin(requests);
    }

    /**
     * Get the requests to get the total payments by status
     * @param  leadStatus The payment status
     * @return            The requests
     */
    private _getTotalPaymentsByStatus(paymentStatus: PaymentStatus[]): Observable<number[]> {
        let requests: Observable<number>[] = [];
        for(let status of paymentStatus) {
            const filters: string = UtilitiesHelper.generateHttpFilter('paymentStatusId', [status.paymentStatusId]);
            requests.push(this._paymentService.getTotalPayments(filters));
        }
        return forkJoin(requests);
    }

    /**
     * Get the requests to get the total payments by status
     * @param  leadStatus The payment status
     * @return            The requests
     */
    private _getTotalSinistersByStatus(sinisterStatus: SinisterStatus[]): Observable<HttpResponse[]> {
        let requests: Observable<HttpResponse>[] = [];
        for(let status of sinisterStatus) {
            requests.push(this._sinisterService.getTotalSinisters(status.sinisterStatusId));
        }
        return forkJoin(requests);
    }
}
