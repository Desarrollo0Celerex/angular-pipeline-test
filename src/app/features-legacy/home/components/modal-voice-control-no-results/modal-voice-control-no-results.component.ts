import { Component } from '@angular/core';

import { VoiceControlCommandNotFoundData } from '@interfaces/voice-control-command-not-found-data.interface';
import { VoiceControlService } from '../../services/voice-control/voice-control.service';

declare var ModalPlugin: any;
declare var ArtyomPlugin: any;

@Component({
    selector: 'agt-modal-voice-control-no-results',
    templateUrl: './modal-voice-control-no-results.component.html',
    styles: [],
    standalone: false
})
export class ModalVoiceControlNoResultsComponent {
    modalId: string = 'agt-voice-control-no-results';
    commandText: string = '';

    constructor(private _voiceControlService: VoiceControlService) {
        ModalPlugin.hide(this.modalId);
        this._voiceControlService.modalNoResults.subscribe(
            (status: VoiceControlCommandNotFoundData) => {
                this._toggleModal(status);
            }
        );
    }

    onClickCloseModal(): void {
        this._voiceControlService.hideModalNoResults();
    }

    onClickRetry(): void {
        this._voiceControlService.hideModalNoResults();
        this._voiceControlService.showModalTalking();
        ArtyomPlugin.startSpeechRecognition();
    }

    private _toggleModal(status: VoiceControlCommandNotFoundData): void {
        this.commandText = status.commandText;
        if (status.canShowModal) {
            ModalPlugin.show(this.modalId);
        } else {
            ModalPlugin.hide(this.modalId);
        }
    }
}
