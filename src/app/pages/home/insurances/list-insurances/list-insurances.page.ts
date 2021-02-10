import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { HttpResponse } from '@interfaces/http-response.interface';

import { ListInsurancesService } from './list-insurances.service';

declare var ModalPlugin: any;

@Component({
  selector: 'agt-list-insurances',
  templateUrl: './list-insurances.page.html',
  styles: [
  ]
})
export class ListInsurancesPage implements OnInit {
    cardContactMessage: string;
    contactId: string;
    createQuotationModalId: string;
    selectedInsuranceId: number;

    constructor(
        public listInsurancesService: ListInsurancesService,
        private _activatedRoute: ActivatedRoute
    ) {
        this.cardContactMessage = 'Selecciona el tipo de seguro que deseas cotizar para';
        this.contactId = '';
        this.createQuotationModalId = 'agt-create-quotation';
        this.selectedInsuranceId = 0;
    }

    ngOnInit(): void {
        this._catchParams();
        this.listInsurancesService.getInsuranceCategories().subscribe( (res: HttpResponse) => {
            this.listInsurancesService.loadCategoryInsurances(res.data);
        })
    }

    /**
     * Event to show modal create quotation
     * @param insuranceId The insurance ID to quote
     */
    onQuoteInsurance(insuranceId: number): void {
        this.selectedInsuranceId = insuranceId;
        ModalPlugin.show(this.createQuotationModalId);
    }

    /**
     * Catch the params
     */
    private _catchParams(): void {
        this.contactId = this._activatedRoute.snapshot.params.contactId;
    }

}
