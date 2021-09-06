import { Component, Input, OnInit } from '@angular/core';

declare var ModalPlugin: any;

@Component({
  selector: 'agt-modal-confirm-share-app',
  templateUrl: './modal-confirm-share-app.component.html',
  styles: [
  ]
})
export class ModalConfirmShareAppComponent implements OnInit {
    @Input() url: string = '';
    @Input() modalId: string = '';

    constructor() { }

    ngOnInit(): void {
    }

    closeModal(): void {
        ModalPlugin.hide(this.modalId);
    }

}
