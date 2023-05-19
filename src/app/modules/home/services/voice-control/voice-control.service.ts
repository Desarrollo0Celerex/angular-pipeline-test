import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { Contact } from '@core/interfaces/contact.interface';
import { VoiceControlContactResultsData } from '@interfaces/voice-control-contact-results-data.interface';
import { VoiceControlProcessingRequestData } from '@interfaces/voice-control-processing-request-data.interface';
import { VoiceControlCommandNotFoundData } from '@interfaces/voice-control-command-not-found-data.interface';

@Injectable()
export class VoiceControlService {
    public isTalking: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
        false
    );
    public isProcessingRequest: BehaviorSubject<VoiceControlProcessingRequestData> =
        new BehaviorSubject<VoiceControlProcessingRequestData>({
            isProcessingRequest: false,
            commandText: '',
        });
    public contactResults: BehaviorSubject<VoiceControlContactResultsData> =
        new BehaviorSubject<VoiceControlContactResultsData>({
            canShowModal: false,
            contacts: [],
        });
    public modalNotSupported: BehaviorSubject<boolean> =
        new BehaviorSubject<boolean>(false);
    public modalCommandNotFound: BehaviorSubject<VoiceControlCommandNotFoundData> =
        new BehaviorSubject<VoiceControlCommandNotFoundData>({
            canShowModal: false,
            commandText: '',
        });
    public modalNoResults: BehaviorSubject<VoiceControlCommandNotFoundData> =
        new BehaviorSubject<VoiceControlCommandNotFoundData>({
            canShowModal: false,
            commandText: '',
        });

    /**
     * Show the modal
     */
    public showModalTalking(): void {
        this.isTalking.next(true);
    }

    /**
     * Hide the modal
     */
    public hideModalTalking(): void {
        this.isTalking.next(false);
    }

    /**
     * Show the modal
     */
    public showModalProcessingRequest(commandText: string): void {
        this.isProcessingRequest.next({
            isProcessingRequest: true,
            commandText,
        });
    }

    /**
     * Hide the modal
     */
    public hideModalProcessingRequest(): void {
        this.isProcessingRequest.next({
            isProcessingRequest: false,
            commandText: '',
        });
    }

    /**
     * Show the modal
     */
    public showModalContactResults(contacts: Contact[]): void {
        this.contactResults.next({
            canShowModal: true,
            contacts: contacts,
        });
    }

    /**
     * Hide the modal
     */
    public hideModalContactResults(): void {
        this.contactResults.next({
            canShowModal: false,
            contacts: [],
        });
    }

    /**
     * Show the modal
     */
    public showModalNotSupported(): void {
        this.modalNotSupported.next(true);
    }

    /**
     * Hide the modal
     */
    public hideModalNotSupported(): void {
        this.modalNotSupported.next(false);
    }

    /**
     * Show the modal
     */
    public showModalCommandNotFound(commandText: string): void {
        this.modalCommandNotFound.next({
            canShowModal: true,
            commandText,
        });
    }

    /**
     * Hide the modal
     */
    public hideModalCommandNotFound(): void {
        this.modalCommandNotFound.next({
            canShowModal: false,
            commandText: '',
        });
    }
    /**
     * Show the modal
     */
    public showModalNoResults(commandText: string): void {
        this.modalNoResults.next({
            canShowModal: true,
            commandText,
        });
    }

    /**
     * Hide the modal
     */
    public hideModalNoResults(): void {
        this.modalNoResults.next({
            canShowModal: false,
            commandText: '',
        });
    }
}
