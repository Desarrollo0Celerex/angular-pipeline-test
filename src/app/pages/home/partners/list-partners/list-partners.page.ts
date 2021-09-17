import { Component, OnInit } from '@angular/core';

declare var ModalPlugin: any;

@Component({
  selector: 'agt-list-partners',
  templateUrl: './list-partners.page.html',
  styles: [
  ]
})
export class ListPartnersPage implements OnInit {
    modalIdCreatePartner: string = 'modal-create-partner';

    constructor() { }

    ngOnInit(): void {
    }

    showModalToCretePartner(): void {
        ModalPlugin.show(this.modalIdCreatePartner);
    }

}
