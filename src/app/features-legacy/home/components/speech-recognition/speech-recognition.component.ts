import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';

import { ROUTES_NAME } from '@constants/routes-name';
import { environment } from '@env/environment';
import { Contact } from '@core/interfaces/contact.interface';
import { HttpResponse } from '@core/interfaces/http-response.interface';
import { ContactService } from '@core/services/contact/contact.service';
import { VoiceControlService } from '../../services/voice-control/voice-control.service';
import { HttpResponseItems } from '@core/interfaces/http-response-items.interface';
import { PAY_TRACKER_ROUTES } from '@core/constants/routes';

declare var ArtyomPlugin: any;

@Component({
    selector: 'agt-speech-recognition',
    templateUrl: './speech-recognition.component.html',
    styles: [],
    standalone: false
})
export class SpeechRecognitionComponent implements OnInit {
    private _artyomConfig: any = {
        lang: 'es-ES',
        continue: false,
        debug: environment.production ? false : true,
    };
    private _artyomCommands: any = [
        {
            commands: ['Muéstrame el perfil de *', 'Muestrame el perfil de *'],
            isSmart: true,
            action: this._showProfileOf,
        },
        {
            commands: [
                'Muéstrame siniestros pendientes',
                'Muéstrame los siniestros pendientes',
            ],
            isSmart: false,
            action: this._showPendingSinisters,
        },
        {
            commands: [
                'Muéstrame recibos vencidos',
                'Muéstrame los recibos vencidos',
            ],
            isSmart: false,
            action: this._showOverdueReceipts,
        },
        {
            commands: [
                'Muéstrame prospectos nuevos',
                'Muéstrame los prospectos nuevos',
            ],
            isSmart: false,
            action: this._showNewLeads,
        },
        {
            commands: [
                'Muéstrame clientes influyentes',
                'Muéstrame los clientes influyentes',
            ],
            isSmart: false,
            action: this._showInfluentialClients,
        },
    ];
    private _textRecognized: string = '';

    constructor(
        private _contactService: ContactService,
        private _router: Router,
        private _voiceControlService: VoiceControlService,
        private _zone: NgZone
    ) {}

    ngOnInit(): void {
        ArtyomPlugin.init(this._artyomConfig, this._artyomCommands, this);
    }

    onClickStartSpeechRecognition(): void {
        this._checkSpeechRecongnitionStatus();
    }

    setTextRecognized(textRecognized: string): void {
        this._textRecognized = textRecognized;
    }

    private _checkSpeechRecongnitionStatus(): void {
        const speechRecognitionStatus: boolean =
            ArtyomPlugin.checkIfRecognizingSupported();
        if (speechRecognitionStatus) {
            this._voiceControlService.showModalTalking();
            ArtyomPlugin.startSpeechRecognition();
        } else {
            this._voiceControlService.showModalNotSupported();
        }
    }

    private _hideModalTalking(): void {
        this._voiceControlService.hideModalTalking();
    }

    private _showProfileOf(
        context: SpeechRecognitionComponent,
        data: string
    ): void {
        context._hideModalTalking();
        context._voiceControlService.showModalProcessingRequest(
            context._textRecognized
        );
        context._searchContact(context, data);

        /* context._speechRecognitionService
            .searchContact(data)
            .subscribe((res: HttpResponse) => {
                setTimeout(() => {
                    const contacts: Contact[] = res.data.items;
                    context._voiceControlService.hideModalProcessingRequest();
                    if (contacts.length === 0) {
                        context._zone.run(() => {
                            context._voiceControlService.showModalNoResults(
                                data
                            );
                        });
                    } else if (contacts.length === 1) {
                        context._zone.run(() => {
                            context._router.navigate([
                                ROUTES_NAME.contactResume(
                                    res.data.items[0].contactId
                                ),
                            ]);
                        });
                    } else {
                        context._zone.run(() => {
                            context._voiceControlService.showModalContactResults(
                                contacts
                            );
                        });
                    }
                }, 1500);
            }); */
    }

    private _searchContact(
        context: SpeechRecognitionComponent,
        contactName: string
    ): void {
        const page: number = 1;
        const perPage: number = 100;
        const fields: string =
            'contactId,contactName,clientStatusName,leadStatusName,clientStatusBackground,leadStatusBackground,totalGlobalWallet,currencyName,totalActivePolicies';
        this._contactService
            .getContacts(page, fields, contactName, null, perPage)
            .subscribe((res: HttpResponseItems) => {
                setTimeout(() => {
                    const contacts: Contact[] = res.items;
                    context._voiceControlService.hideModalProcessingRequest();
                    if (contacts.length === 0) {
                        context._zone.run(() => {
                            context._voiceControlService.showModalNoResults(
                                contactName
                            );
                        });
                    } else if (contacts.length === 1) {
                        context._zone.run(() => {
                            context._router.navigate([
                                ROUTES_NAME.contactResume(
                                    res.items[0].contactId
                                ),
                            ]);
                        });
                    } else {
                        context._zone.run(() => {
                            context._voiceControlService.showModalContactResults(
                                contacts
                            );
                        });
                    }
                }, 1500);
            });
    }

    private _showPendingSinisters(context: SpeechRecognitionComponent): void {
        context._hideModalTalking();
        context._voiceControlService.showModalProcessingRequest(
            context._textRecognized
        );
        setTimeout(() => {
            context._voiceControlService.hideModalProcessingRequest();
            context._zone.run(() => {
                context._router.navigate([ROUTES_NAME.listSinisters], {
                    queryParams: { contentSubtype: 2 },
                });
            });
        }, 1500);
    }

    private _showOverdueReceipts(context: SpeechRecognitionComponent): void {
        context._hideModalTalking();
        context._voiceControlService.showModalProcessingRequest(
            context._textRecognized
        );
        setTimeout(() => {
            context._voiceControlService.hideModalProcessingRequest();
            context._zone.run(() => {
                context._router.navigate(
                    [
                        `${PAY_TRACKER_ROUTES.MODULE}/${PAY_TRACKER_ROUTES.PAYMENTS}`,
                    ],
                    {
                        queryParams: { contentSubtype: 4 },
                    }
                );
            });
        }, 1500);
    }

    private _showNewLeads(context: SpeechRecognitionComponent): void {
        context._hideModalTalking();
        context._voiceControlService.showModalProcessingRequest(
            context._textRecognized
        );
        setTimeout(() => {
            context._voiceControlService.hideModalProcessingRequest();
            context._zone.run(() => {
                context._router.navigate([ROUTES_NAME.listLeads], {
                    queryParams: { contentSubtype: 1 },
                });
            });
        }, 1500);
    }

    private _showInfluentialClients(context: SpeechRecognitionComponent): void {
        context._hideModalTalking();
        context._voiceControlService.showModalProcessingRequest(
            context._textRecognized
        );
        setTimeout(() => {
            context._voiceControlService.hideModalProcessingRequest();
            context._zone.run(() => {
                context._router.navigate([ROUTES_NAME.listClients], {
                    queryParams: { contentSubtype: 3 },
                });
            });
        }, 1500);
    }

    private _commandNotFound(): void {
        this._voiceControlService.showModalCommandNotFound(
            this._textRecognized
        );
    }
}
