import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { CreateQuotationDataSend } from '@interfaces/create-quotation-data-send.interface';
import { HttpResponse } from '@interfaces/http-response.interface';
import { InsuranceTypeService } from '@services/insurance-type.service';
import { QuotationService } from '@services/quotation.service';

import { FREE_TEXT_LENGTH } from '@constants/global';
import { ValidatorsHelper } from '@helpers/validators.helper';
import { InsuranceType } from '@interfaces/insurance-type.interface';

@Injectable()
export class ModalCreateQuotationService {
    insuranceTypes: InsuranceType[];
    quotationForm: FormGroup;

    constructor(
        private _formBuilder: FormBuilder,
        private _insuranceTypeService: InsuranceTypeService,
        private _quotationService: QuotationService
    ) {
        this.insuranceTypes = [];
        this.quotationForm = this._formBuilder.group({});
    }

    get f() {
        return this.quotationForm.controls;
    }

    /**
     * Build the quotation form
     */
    buildQuotationForm(): void {
        this.quotationForm = this._formBuilder.group({
            description: ['', [Validators.required, Validators.minLength(FREE_TEXT_LENGTH.MIN), Validators.maxLength(FREE_TEXT_LENGTH.MAX), ValidatorsHelper.freeText]],
            insuranceTypeId: ['', [Validators.required] ]
        })
    }

    /**
     * Create a quotation
     * @param  contactId   The contact ID
     * @param  insuranceId The insurance ID
     * @return             The quotation ID
     */
    createQuotation(contactId: string, insuranceId: number): Observable<HttpResponse> {
        const requestBody: CreateQuotationDataSend = {
            insuranceId: insuranceId,
            ...this.quotationForm.value
        }
        return this._quotationService.createQuotation(contactId, requestBody);
    }

    /**
     *  Load the insurance types of an insurance
     * @param  insuranceId The insurance ID
     * @return             Notice of action done
     */
    loadInsuranceTypes(insuranceId: number): Observable<void> {
        const fields: string = 'insuranceTypeId,name';
        return this._insuranceTypeService.getInsuranceTypes(insuranceId, fields).pipe(
            tap((res: HttpResponse) => {
                this.insuranceTypes = res.data;
            }),
            map( () => { return; })
        )
    }
}
