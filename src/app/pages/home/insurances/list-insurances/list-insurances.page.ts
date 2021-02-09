import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { HttpResponse } from '@interfaces/http-response.interface';

import { ListInsurancesService } from './list-insurances.service';

@Component({
  selector: 'agt-list-insurances',
  templateUrl: './list-insurances.page.html',
  styles: [
  ]
})
export class ListInsurancesPage implements OnInit {
    contactId: string;
    cardContactMessage: string;

    constructor(
        public listInsurancesService: ListInsurancesService,
        private _activatedRoute: ActivatedRoute
    ) {
        this.contactId = '';
        this.cardContactMessage = 'Selecciona el tipo de seguro que deseas cotizar para';
    }

    ngOnInit(): void {
        this._catchParams();
        this.listInsurancesService.getInsuranceCategories().subscribe( (res: HttpResponse) => {
            this.listInsurancesService.loadCategoryInsurances(res.data);
        })
    }

    /**
     * Event to quote an insurance
     * @param insuranceId The insurance ID to quote
     */
    onQuoteInsurance(insuranceId: number): void {
        console.log('Mostrar modal para cotizar seguro: ',insuranceId);
    }

    /**
     * Catch the params
     */
    private _catchParams(): void {
        this.contactId = this._activatedRoute.snapshot.params.contactId;
    }

}
