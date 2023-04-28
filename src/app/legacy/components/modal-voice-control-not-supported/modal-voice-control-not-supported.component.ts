import { Component } from '@angular/core';

import { VoiceControlService } from '@services/voice-control.service';

declare var ModalPlugin: any;

@Component({
  selector: 'agt-modal-voice-control-not-supported',
  templateUrl: './modal-voice-control-not-supported.component.html',
  styles: [
  ]
})
export class ModalVoiceControlNotSupportedComponent {
    modalId: string = 'agt-voice-control-not-supported';

    constructor(private _voiceControlService: VoiceControlService) {
        ModalPlugin.hide(this.modalId);
        this._voiceControlService.modalNotSupported.subscribe( (status: boolean) => {
            this._toggleModal(status);
        })
    }

    /**
     * Click event to close the modal
     */
    onClickCloseModal(): void {
        this._voiceControlService.hideModalNotSupported();
    }

    /**
     * Toggle the modal
     * @param status The modal status
     */
    private _toggleModal(status: boolean): void {
        if(status) {
            ModalPlugin.show(this.modalId);
        } else {
            ModalPlugin.hide(this.modalId);
        }
    }

}
