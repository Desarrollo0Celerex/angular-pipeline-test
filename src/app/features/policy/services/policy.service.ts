import { Injectable } from '@angular/core';
import { ApiHttp } from '@core/http/api.http';
import { Observable } from 'rxjs';
import { SendPolicyNotification } from '../interfaces/send-policy-notification.interface';
import { environment } from '@env/environment';

const ENDPOINTS = {
    policyNotification: `${environment.agenthosNotifier.apiUrl}/policies`,
};

@Injectable()
export class PolicyService {
    constructor(private _apiHttp: ApiHttp) {}

    sendPolicyNotification(
        requestBody: SendPolicyNotification
    ): Observable<string> {
        return this._apiHttp.post(ENDPOINTS.policyNotification, requestBody);
    }
}
