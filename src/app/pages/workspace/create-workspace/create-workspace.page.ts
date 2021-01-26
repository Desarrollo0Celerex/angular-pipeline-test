import { Component, OnInit } from '@angular/core';

import { DEFAULT_PHONE_CODE } from '@constants/global';

declare var Select2Plugin: any;

@Component({
  selector: 'agt-create-workspace',
  templateUrl: './create-workspace.page.html',
  styles: [
  ]
})
export class CreateWorkspacePage implements OnInit {
    DEFAULT_PHONE_CODE: number = DEFAULT_PHONE_CODE;

    constructor() { }

    ngOnInit(): void {
        Select2Plugin.init();
    }

    phoneCodeIdSelected(selectedPhoneCodeId: number): void {
        console.log('Código seleccionado: ', selectedPhoneCodeId);
    }

}
