import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { ROUTES_NAME } from '@constants/routes-name';
import { Contact } from '@interfaces/contact.interface';
import { VoiceControlContactResultsData } from '@interfaces/voice-control-contact-results-data.interface';
import { VoiceControlService } from '@services/voice-control.service';

declare var ModalPlugin: any;

@Component({
  selector: 'agt-modal-voice-control-contact-results',
  templateUrl: './modal-voice-control-contact-results.component.html',
  styles: []
})
export class ModalVoiceControlContactResultsComponent {
    modalId: string = 'agt-voice-control-contact-results';
    commandText: string = '';
    contacts: Contact[] = [];

    constructor(
        private _voiceControlService: VoiceControlService,
        private _router: Router
    ) {
        this._voiceControlService.contactResults.subscribe( (status: VoiceControlContactResultsData) => {
            this._toggleModal(status);
        })
    }

    /**
     * Click event to close the modal
     */
    onClickCloseModal(): void {
        this._voiceControlService.hideModalContactResults();
    }

    /**
     * Click event to select a contact
     * @param contactId [description]
     */
    onClickSelectContact(contactId: string): void {
        this._voiceControlService.hideModalContactResults();
        this._router.navigate([ROUTES_NAME.contactResume(contactId)]);
    }

    /**
     * Toggle the modal
     * @param status The modal status
     */
    private _toggleModal(status: VoiceControlContactResultsData): void {
        this.contacts = status.contacts;
        if(status.canShowModal) {
            ModalPlugin.show(this.modalId);
        } else {
            ModalPlugin.hide(this.modalId);
        }
    }
}
