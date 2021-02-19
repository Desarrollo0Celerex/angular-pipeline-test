import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'agt-complete-policy',
  templateUrl: './complete-policy.page.html',
  styles: [
  ]
})
export class CompletePolicyPage implements OnInit {
    contactId: string;
    message: string;
    quotationId: string;

    constructor(private _activatedRoute: ActivatedRoute) {
        this.contactId = '';
        this.message = 'Verfica los datos para la nueva póliza de';
        this.quotationId = '';
    }

    ngOnInit(): void {
        this._catchParams();
    }

    private _catchParams(): void {
        this.contactId = this._activatedRoute.snapshot.params.contactId;
        this.quotationId = this._activatedRoute.snapshot.params.quotationId;
    }

}
