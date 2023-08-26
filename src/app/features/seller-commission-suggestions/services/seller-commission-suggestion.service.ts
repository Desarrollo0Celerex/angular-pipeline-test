import { Injectable } from '@angular/core';
import { ApiHttp } from '@core/http/api.http';
import { environment } from '@env/environment';
import { AuthService } from '@features-legacy/auth/services/auth.service';
import { SellerCommissionSuggestion } from '@seller-commission-suggestions/interfaces/seller-commission-suggestion.interface';
import { Observable } from 'rxjs';

const ENDPOINTS = {
    sellerCommissionSuggestions: (
        workspaceId: string,
        sellerId: number,
        insurerId: number,
        insuranceId: number,
        insuranceTypeId: number
    ) =>
        `${environment.agenthos.apiUrl}/workspaces/${workspaceId}/sellers/${sellerId}/insurers/${insurerId}/insurances/${insuranceId}/insurance-types/${insuranceTypeId}/seller-commission-suggestions`,
};

@Injectable()
export class SellerCommissionSuggestionService {
    private _workspaceId: string = this._authService.workspaceId;

    constructor(private _apiHttp: ApiHttp, private _authService: AuthService) {}

    getSellerCommissionSuggestion(
        sellerId: number,
        insurerId: number,
        insuranceId: number,
        insuranceTypeId: number,
        fields: string = ''
    ): Observable<SellerCommissionSuggestion> {
        return this._apiHttp
            .param('fields', fields)
            .get(
                ENDPOINTS.sellerCommissionSuggestions(
                    this._workspaceId,
                    sellerId,
                    insurerId,
                    insuranceId,
                    insuranceTypeId
                )
            );
    }
}
