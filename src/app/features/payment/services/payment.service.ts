import { Injectable } from '@angular/core';
import { ApiHttp } from '@core/http/api.http';
import { AuthService } from '@features-legacy/auth/services/auth.service';
import { PAYMENT_ENDPOINTS } from '@payment/constants/endpoints';
import { Payment } from '@payment/interfaces/payment.interface';
import { Observable } from 'rxjs';

@Injectable()
export class PaymentService {
    private _workspaceId: string = this._authService.workspaceId;

    constructor(private _apiHttp: ApiHttp, private _authService: AuthService) {}

    getWorkspacePayment(
        paymentId: string,
        fields: string = ''
    ): Observable<Payment> {
        return this._apiHttp
            .param('fields', fields)
            .get(
                PAYMENT_ENDPOINTS.workspacePayment(this._workspaceId, paymentId)
            );
    }
}
