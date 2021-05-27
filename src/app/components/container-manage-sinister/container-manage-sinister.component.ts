import { Component, Input, OnInit } from '@angular/core';

import { SINISTER_STATUS } from '@constants/global';
import { SinisterDataSend } from '@interfaces/sinister-data-send.interface';

import { ContainerManageSinisterService } from './container-manage-sinister.service';

declare var ModalPlugin: any;

@Component({
  selector: 'agt-container-manage-sinister',
  templateUrl: './container-manage-sinister.component.html',
  styles: [
  ]
})
export class ContainerManageSinisterComponent implements OnInit {
    @Input() sinisterData: SinisterDataSend | null = null;
    SINISTER_STATUS: any = SINISTER_STATUS;
    modalIdConfirmFinalizeSinister: string = 'agt-confirm-finalize-sinister';
    modalIdConfirmReactivateSinister: string = 'agt-confirm-reactivate-sinister';
    modalIdUpdateSinister: string = 'agt-update-sinister';

    constructor(public containerManageSinisterService: ContainerManageSinisterService) { }

    ngOnInit(): void {
        if(!!this.sinisterData) {
            this.containerManageSinisterService.loadSinister(this.sinisterData);
        }
    }

    /**
     * Click event to update the sinister
     */
    onClickUpdateSinister(): void {
        ModalPlugin.show(this.modalIdUpdateSinister);
    }

    /**
     * Click event to reactivate the sinister
     */
    onClickReactivateSinister(): void {
        ModalPlugin.show(this.modalIdConfirmReactivateSinister);
    }

    /**
     * Click event to finalize the sinister
     */
    onClickFinalizeSinister(): void {
        ModalPlugin.show(this.modalIdConfirmFinalizeSinister);
    }
}
