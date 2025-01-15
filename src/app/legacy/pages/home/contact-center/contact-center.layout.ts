import { Component } from '@angular/core';

import { ROUTES_NAME } from '@constants/routes-name';

@Component({
    selector: 'agt-contact-center',
    templateUrl: './contact-center.layout.html',
    styles: [],
    standalone: false
})
export class ContactCenterLayout {
    ROUTES_NAME: any = ROUTES_NAME;
}
