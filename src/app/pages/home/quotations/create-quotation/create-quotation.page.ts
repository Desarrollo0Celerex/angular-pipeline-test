import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ACTION_TYPES } from '@constants/global';

@Component({
  selector: 'agt-create-quotation',
  templateUrl: './create-quotation.page.html',
  styles: [
  ]
})
export class CreateQuotationPage implements OnInit {
    actionType: number = ACTION_TYPES.CREATE_QUOTATION;
    contactDetailsMessage: string = 'Selecciona el tipo de seguro que deseas cotizar para';
    contactId: string = '';

    constructor(
        private _activatedRoute: ActivatedRoute
    ) { }

    ngOnInit(): void {
        this._catchParams();
    }

    private _catchParams(): void {
        this.contactId = this._activatedRoute.snapshot.params.contactId;
    }
}
