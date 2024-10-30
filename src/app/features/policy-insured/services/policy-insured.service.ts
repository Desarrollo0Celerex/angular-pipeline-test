import { Injectable } from '@angular/core';
import { ApiHttp } from '@core/http/api.http';
import { Observable } from 'rxjs';
import { POLICY_INSURED_ENDPOINTS } from '../constants/endpoints';
import { AuthService } from '@features-legacy/auth/services/auth.service';
import { DEFAULT_PAGE, DEFAULT_PER_PAGE } from '@constants/global';
import { Insured } from '@interfaces/insured.interface';
import { map } from 'rxjs/operators';

@Injectable()
export class PolicyInsuredService {
    private _workspaceId: string = this._authService.workspaceId;

    constructor(private _authService: AuthService, private _apiHttp: ApiHttp) {}

    createPolicyInsured(
        contactId: string,
        policyId: string,
        requestBody: FormData
    ): Observable<Insured> {
        return this._apiHttp.post(
            POLICY_INSURED_ENDPOINTS.policyInsureds(
                this._workspaceId,
                contactId,
                policyId
            ),
            requestBody
        );
    }

    deletePolicyInsured(
        contactId: string,
        policyId: string,
        policyInsuredId: string
    ): Observable<void> {
        return this._apiHttp.delete(
            POLICY_INSURED_ENDPOINTS.policyInsured(
                this._workspaceId,
                contactId,
                policyId,
                policyInsuredId
            )
        );
    }

    getPolicyInsureds(
        contactId: string,
        policyId: string,
        fields: string,
        page: number = DEFAULT_PAGE,
        perPage: number = DEFAULT_PER_PAGE,
        sortBy: string = 'insuredNumber',
        query: string = ''
    ): Observable<Insured[]> {
        return this._apiHttp
            .param('fields', fields)
            .param('page', page.toString())
            .param('perPage', perPage.toString())
            .param('sortBy', sortBy)
            .param('search', query)
            .get(
                POLICY_INSURED_ENDPOINTS.policyInsureds(
                    this._workspaceId,
                    contactId,
                    policyId
                )
            )
            .pipe(map((res: any) => res.items));
    }

    updatePolicyInsured(
        contactId: string,
        policyId: string,
        policyInsuredId: string,
        requestBody: FormData
    ): Observable<Insured> {
        return this._apiHttp.post(
            POLICY_INSURED_ENDPOINTS.policyInsured(
                this._workspaceId,
                contactId,
                policyId,
                policyInsuredId
            ),
            requestBody
        );
    }
}
