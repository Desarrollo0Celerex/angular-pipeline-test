import { Component } from '@angular/core';

import { VoiceControlService } from '../../services/voice-control/voice-control.service';

declare var ModalPlugin: any;
declare var ArtyomPlugin: any;

@Component({
    selector: 'agt-modal-voice-control-talking',
    templateUrl: './modal-voice-control-talking.component.html',
    styles: [],
    standalone: false
})
export class ModalVoiceControlTalkingComponent {
    modalId: string = 'agt-voice-control-talking';

    constructor(private _voiceControlService: VoiceControlService) {
        ModalPlugin.hide(this.modalId);
        this._voiceControlService.isTalking.subscribe((status: boolean) => {
            this._toggleModal(status);
        });
    }

    onClickCloseModal(): void {
        this._voiceControlService.hideModalTalking();
        ArtyomPlugin.stopSpeechRecognition();
    }

    private _toggleModal(status: boolean): void {
        if (status) {
            ModalPlugin.show(this.modalId);
        } else {
            ModalPlugin.hide(this.modalId);
        }
    }
}
