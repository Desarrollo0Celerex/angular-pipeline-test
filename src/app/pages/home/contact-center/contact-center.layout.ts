import { Component, OnInit } from '@angular/core';

import { ROUTES_NAME } from '@constants/routes-name';

@Component({
  selector: 'agt-contact-center',
  templateUrl: './contact-center.layout.html',
  styles: [
  ]
})
export class ContactCenterLayout implements OnInit {
    ROUTES_NAME: any = ROUTES_NAME;
    
    constructor() { }

    ngOnInit(): void {
    }

}
