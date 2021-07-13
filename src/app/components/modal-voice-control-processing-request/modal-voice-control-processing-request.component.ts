import { Component } from '@angular/core';

import { VoiceControlProcessingRequestData } from '@interfaces/voice-control-processing-request-data.interface';
import { VoiceControlService } from '@services/voice-control.service';

declare var ModalPlugin: any;

@Component({
  selector: 'agt-modal-voice-control-processing-request',
  templateUrl: './modal-voice-control-processing-request.component.html',
  styles: [
  ]
})
export class ModalVoiceControlProcessingRequestComponent {
    modalId: string = 'agt-voice-control-processing-request';
    commandText: string = '';

    constructor(private _voiceControlService: VoiceControlService) {
        this._voiceControlService.isProcessingRequest.subscribe( (status: VoiceControlProcessingRequestData) => {
            this._toggleModal(status);
        })
    }

    /**
     * Toggle the modal
     * @param status The modal status
     */
    private _toggleModal(status: VoiceControlProcessingRequestData): void {
        this.commandText = status.commandText;
        if(status.isProcessingRequest) {
            ModalPlugin.show(this.modalId);
        } else {
            ModalPlugin.hide(this.modalId);
        }
    }

}
