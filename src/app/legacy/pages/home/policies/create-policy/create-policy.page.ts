import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ACTION_TYPES } from '@constants/global';

@Component({
  selector: 'agt-create-policy',
  templateUrl: './create-policy.page.html',
  styles: [
  ]
})
export class CreatePolicyPage implements OnInit {
    actionType: number = ACTION_TYPES.CREATE_POLICY;
    contactDetailsMessage: string = 'Selecciona el tipo de seguro para cargar la póliza de';
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
