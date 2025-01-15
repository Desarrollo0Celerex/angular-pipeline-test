import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import moment from 'moment';

import { environment } from '@env/environment';
import { FinalizeSinisterEventDataSend } from '@interfaces/finalize-sinister-event-data-send.interface';
import { HttpResponse } from '@core/interfaces/http-response.interface';
import { SinisterEvent } from '@interfaces/sinister-event.interface';
import { SinisterEventDataSend } from '@interfaces/sinister-event-data-send.interface';
import { AuthService } from '@features-legacy/auth/services/auth.service';

const routes: any = {
    sinisterEvents: (
        workspaceId: string,
        contactId: string,
        policyId: string,
        sinisterId: string
    ) =>
        environment.agenthos.apiUrl +
        '/workspaces/' +
        workspaceId +
        '/contacts/' +
        contactId +
        '/policies/' +
        policyId +
        '/sinisters/' +
        sinisterId +
        '/events',
    sinisterEvent: (
        workspaceId: string,
        contactId: string,
        policyId: string,
        sinisterId: string,
        sinisterEventId: string
    ) =>
        environment.agenthos.apiUrl +
        '/workspaces/' +
        workspaceId +
        '/contacts/' +
        contactId +
        '/policies/' +
        policyId +
        '/sinisters/' +
        sinisterId +
        '/events/' +
        sinisterEventId,
};

@Injectable()
export class SinisterEventService {
    private _workspaceId: string = this._authService.workspaceId;

    constructor(
        private _httpClient: HttpClient,
        private _authService: AuthService
    ) {}

    /**
     * Create a sinister event from the API
     * @param  contactId   The contact ID
     * @param  policyId    The policy ID
     * @param  sinisterId  The sinister ID
     * @param  requestBody The request body
     * @return             Notice of action done
     */
    createSinisterEvent(
        contactId: string,
        policyId: string,
        sinisterId: string,
        requestBody: FormData
    ): Observable<void> {
        const route: string = routes.sinisterEvents(
            this._workspaceId,
            contactId,
            policyId,
            sinisterId
        );
        return this._httpClient.post<void>(route, requestBody);
    }

    /**
     * Delete the sinister event fron the API
     * @param  sinisterEventData The sinister event data
     * @return                   Notice of action done
     */
    deleteSinisterEvent(
        sinisterEventData: SinisterEventDataSend
    ): Observable<void> {
        const route: string = routes.sinisterEvent(
            this._workspaceId,
            sinisterEventData.contactId,
            sinisterEventData.policyId,
            sinisterEventData.sinisterId,
            sinisterEventData.sinisterEventId
        );
        return this._httpClient.delete<void>(route);
    }

    finalizeSinisterEvent(
        sinisterEventData: SinisterEventDataSend,
        requestBody: FinalizeSinisterEventDataSend
    ): Observable<void> {
        const route: string = routes.sinisterEvent(
            this._workspaceId,
            sinisterEventData.contactId,
            sinisterEventData.policyId,
            sinisterEventData.sinisterId,
            sinisterEventData.sinisterEventId
        );
        return this._httpClient.put<void>(route, requestBody);
    }

    /**
     * Get the sinister event
     * @param  sinisterEventDataa   The sinister event data
     * @param  fields               The fields to get
     * @return                      The sinister event
     */
    getSinisterEvent(
        sinisterEventData: SinisterEventDataSend,
        fields: string = ''
    ): Observable<SinisterEvent> {
        const route: string = routes.sinisterEvent(
            this._workspaceId,
            sinisterEventData.contactId,
            sinisterEventData.policyId,
            sinisterEventData.sinisterId,
            sinisterEventData.sinisterEventId
        );
        let params: HttpParams = new HttpParams();
        if (!!fields) params = params.append('fields', fields);
        return this._httpClient.get<HttpResponse>(route, { params }).pipe(
            map((res: HttpResponse) => {
                const sinisterEvent: SinisterEvent = res.data;
                sinisterEvent.evidenceName = !!sinisterEvent.evidenceName
                    ? sinisterEvent.evidenceName
                    : '';
                sinisterEvent.providerName = !!sinisterEvent.providerName
                    ? sinisterEvent.providerName
                    : '';
                sinisterEvent.providerDate = !!sinisterEvent.providerDate
                    ? moment(sinisterEvent.providerDate).format('DD/MM/YYYY')
                    : '';
                sinisterEvent.valuationDate = !!sinisterEvent.valuationDate
                    ? moment(sinisterEvent.valuationDate).format('DD/MM/YYYY')
                    : '';
                sinisterEvent.authorizationDate =
                    !!sinisterEvent.authorizationDate
                        ? moment(sinisterEvent.authorizationDate).format(
                              'DD/MM/YYYY'
                          )
                        : '';
                sinisterEvent.insuredNoticeDate =
                    !!sinisterEvent.insuredNoticeDate
                        ? moment(sinisterEvent.insuredNoticeDate).format(
                              'DD/MM/YYYY'
                          )
                        : '';
                sinisterEvent.insuredAuthorizationDate =
                    !!sinisterEvent.insuredAuthorizationDate
                        ? moment(sinisterEvent.insuredAuthorizationDate).format(
                              'DD/MM/YYYY'
                          )
                        : '';
                sinisterEvent.estimatedDeliveryDate =
                    !!sinisterEvent.estimatedDeliveryDate
                        ? moment(sinisterEvent.estimatedDeliveryDate).format(
                              'DD/MM/YYYY'
                          )
                        : '';
                sinisterEvent.repairDate = !!sinisterEvent.repairDate
                    ? moment(sinisterEvent.repairDate).format('DD/MM/YYYY')
                    : '';
                sinisterEvent.deliveryDate = !!sinisterEvent.deliveryDate
                    ? moment(sinisterEvent.deliveryDate).format('DD/MM/YYYY')
                    : '';
                sinisterEvent.readmissionDate = !!sinisterEvent.readmissionDate
                    ? moment(sinisterEvent.readmissionDate).format('DD/MM/YYYY')
                    : '';
                sinisterEvent.providerFolio = !!sinisterEvent.providerFolio
                    ? sinisterEvent.providerFolio
                    : '';
                sinisterEvent.providerBill = !!sinisterEvent.providerBill
                    ? sinisterEvent.providerBill
                    : '';
                sinisterEvent.providerPhoneCodeId =
                    !!sinisterEvent.providerPhoneCodeId
                        ? sinisterEvent.providerPhoneCodeId
                        : 0;
                sinisterEvent.providerPhoneNumber =
                    !!sinisterEvent.providerPhoneNumber
                        ? sinisterEvent.providerPhoneNumber
                        : '';
                sinisterEvent.providerEmail = !!sinisterEvent.providerEmail
                    ? sinisterEvent.providerEmail
                    : '';
                sinisterEvent.observations = !!sinisterEvent.observations
                    ? sinisterEvent.observations
                    : '';
                return sinisterEvent;
            })
        );
    }

    /**
     * Update a sinister event from the API
     * @param  SinisterEventDataSend    The sinister event data
     * @param  requestBody              The request body
     * @return                          Notice of action done
     */
    updateSinisterEvent(
        sinisterEventData: SinisterEventDataSend,
        requestBody: FormData
    ): Observable<void> {
        const route: string = routes.sinisterEvent(
            this._workspaceId,
            sinisterEventData.contactId,
            sinisterEventData.policyId,
            sinisterEventData.sinisterId,
            sinisterEventData.sinisterEventId
        );
        return this._httpClient.post<void>(route, requestBody);
    }
}
