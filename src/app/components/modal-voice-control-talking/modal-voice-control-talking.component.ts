import { Component } from '@angular/core';

import { VoiceControlService } from '@services/voice-control.service';

declare var ModalPlugin: any;
declare var ArtyomPlugin: any;

@Component({
  selector: 'agt-modal-voice-control-talking',
  templateUrl: './modal-voice-control-talking.component.html',
  styles: [
  ]
})
export class ModalVoiceControlTalkingComponent {
    modalId: string = 'agt-voice-control-talking';

    constructor(private _voiceControlService: VoiceControlService) {
        this._voiceControlService.isTalking.subscribe( (status: boolean) => {
            this._toggleModal(status);
        })
    }

    /**
     * Click event to close the modal
     */
    onClickCloseModal(): void {
        this._voiceControlService.hideModalTalking();
        ArtyomPlugin.stopSpeechRecognition();
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
