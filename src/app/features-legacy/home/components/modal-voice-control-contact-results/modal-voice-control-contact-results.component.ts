import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { ROUTES_NAME } from '@constants/routes-name';
import { Contact } from '@core/interfaces/contact.interface';
import { VoiceControlContactResultsData } from '@interfaces/voice-control-contact-results-data.interface';
import { VoiceControlService } from '../../services/voice-control/voice-control.service';

declare var ModalPlugin: any;

@Component({
    selector: 'agt-modal-voice-control-contact-results',
    templateUrl: './modal-voice-control-contact-results.component.html',
    styles: [],
    standalone: false
})
export class ModalVoiceControlContactResultsComponent {
    modalId: string = 'agt-voice-control-contact-results';
    commandText: string = '';
    contacts: Contact[] = [];

    constructor(
        private _voiceControlService: VoiceControlService,
        private _router: Router
    ) {
        ModalPlugin.hide(this.modalId);
        this._voiceControlService.contactResults.subscribe(
            (status: VoiceControlContactResultsData) => {
                this._toggleModal(status);
            }
        );
    }

    onClickCloseModal(): void {
        this._voiceControlService.hideModalContactResults();
    }

    onClickSelectContact(contactId: string): void {
        this._voiceControlService.hideModalContactResults();
        this._router.navigate([ROUTES_NAME.contactResume(contactId)]);
    }

    private _toggleModal(status: VoiceControlContactResultsData): void {
        this.contacts = status.contacts;
        if (status.canShowModal) {
            ModalPlugin.show(this.modalId);
        } else {
            ModalPlugin.hide(this.modalId);
        }
    }
}
