import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import * as moment from 'moment';

import { ValidatorsHelper } from '@helpers/validators.helper';
import { ReceiptPaid } from '@interfaces/receipt-paid.interface';

import { ReceiptPaidService } from '@services/receipt-paid.service';

@Injectable()
export class ModalUpdateReceiptPaidService {
    form: FormGroup = this._formBuilder.group({});
    receiptPaid: ReceiptPaid | null = null;
    isBuiltForm: boolean = false;

    constructor(
        private _formBuilder: FormBuilder,
        private _receiptPaidService: ReceiptPaidService
    ) { }

    loadReceiptPaid(receiptPaidId: string): Observable<void> {
        const fields: string = 'policyNumber,paymentPlanName,validityStartDate,validityEndDate,receiptsAmount,receiptsNumber,applicationDate,currencyName';
        return this._receiptPaidService.getReceiptPaid(receiptPaidId, fields).pipe(
            tap((res: ReceiptPaid) => {
                this.receiptPaid = res;
            }),
            map(() => { })
        )
    }

    buildForm(): void {
        if(!!this.receiptPaid) {
            this.form = this._formBuilder.group({
                receiptsAmount: [this.receiptPaid.receiptsAmount, [Validators.required, ValidatorsHelper.amount]],
                receiptsNumber: [this.receiptPaid.receiptsNumber, [Validators.required, ValidatorsHelper.number]],
                applicationDate: [moment(this.receiptPaid.applicationDate).format('DD/MM/YYYY'), [Validators.required, ValidatorsHelper.date]]
            });
            this.isBuiltForm = true;
        }
    }
}
