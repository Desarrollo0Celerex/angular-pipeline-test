import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'agt-list-insurances',
  templateUrl: './list-insurances.page.html',
  styles: [
  ]
})
export class ListInsurancesPage implements OnInit {
    contactId: string;
    cardContactMessage: string;

    constructor(private _activatedRoute: ActivatedRoute) {
        this.contactId = '';
        this.cardContactMessage = 'Selecciona el tipo de seguro que deseas cotizar para';
    }

    ngOnInit(): void {
        this._catchParams();
    }

    private _catchParams(): void {
        this.contactId = this._activatedRoute.snapshot.params.contactId;
    }

}
