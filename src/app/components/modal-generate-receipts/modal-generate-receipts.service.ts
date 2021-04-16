import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { DEFAULT_METHOD_ID, DEFAULT_PLAN_ID } from '@constants/global';
import { ValidatorsHelper } from '@helpers/validators.helper';
import { HttpResponse } from '@interfaces/http-response.interface';
import { PaymentMethod } from '@interfaces/payment-method.interface';
import { PaymentPlan } from '@interfaces/payment-plan.interface';
import { PaymentMethodService } from '@services/payment-method.service';
import { PaymentPlanService } from '@services/payment-plan.service';

@Injectable()
export class ModalGenerateReceiptsService {
    receiptsForm: FormGroup;
    paymentMethods: PaymentMethod[];
    paymentPlans: PaymentPlan[];

    constructor(
        private _formBuilder: FormBuilder,
        private _paymentMethodService: PaymentMethodService,
        private _paymentPlanService: PaymentPlanService
    ) {
        this.receiptsForm = this._buildReceiptsForm();
        this.paymentMethods = [];
        this.paymentPlans = [];
    }

    /**
     * Load the payment methods
     * @return Notice of action done
     */
    loadPaymentMethods(): Observable<void> {
        const fields: string = 'paymentMethodId,name';
        return this._paymentMethodService.getPaymentMethods(fields).pipe(
            tap((res: HttpResponse) => {
                this.paymentMethods = res.data;
            }),
            map(() => { })
        );
    }

    /**
     * Load the payment plans
     * @return Notice of action done
     */
    loadPaymentPlans(): Observable<void> {
        const fields: string = 'paymentPlanId,name,months';
        return this._paymentPlanService.getPaymentPlans(fields).pipe(
            tap((res: HttpResponse) => {
                this.paymentPlans = res.data;
            }),
            map(() => { })
        );
    }

    /**
     * Build the receipts form
     */
    private _buildReceiptsForm(): FormGroup {
        return this._formBuilder.group({
            paymentMethodId: [DEFAULT_METHOD_ID, [Validators.required]],
            paymentPlanId: [DEFAULT_PLAN_ID, [Validators.required]],
            bills: ['', [Validators.required, ValidatorsHelper.number]],
            paymentDate: ['', [Validators.required, ValidatorsHelper.date]]
        });
    }
}
