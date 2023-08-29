import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { LoadingService } from '@core/services/loading/loading.service';
import { AuthService } from '@features-legacy/auth/services/auth.service';
import { SendPolicy } from '@policies/interfaces/send-policy.interface';
import { SendPolicyNotification } from '@policies/interfaces/send-policy-notification.interface';
import { PolicyService } from '@policies/services/policy.service';
import { GenerateShippingInformationComponent } from '@shared/components/generate-shipping-information/generate-shipping-information.component';
import { ShippingInformation } from '@shared/interfaces/shipping-information.interface';
import { UpdatePolicyContact } from '@policies/interfaces/update-policy-contact.interface';
import { SHIPPING_CONTACT_TYPES } from '@core/constants/settings';
import { PhoneCodePipe } from '@shared/pipes/phone-code.pipe';

@Component({
    selector: 'agt-send-policy',
    templateUrl: './send-policy.component.html',
    styles: [],
})
export class SendPolicyComponent {
    @Output() policySent = new EventEmitter<void>();
    @ViewChild(GenerateShippingInformationComponent)
    generateShippingInformationComponent!: GenerateShippingInformationComponent;
    private _data: SendPolicy | undefined = undefined;

    constructor(
        private _authService: AuthService,
        private _loadingService: LoadingService,
        private _phoneCodePipe: PhoneCodePipe,
        private _policyService: PolicyService
    ) {}

    init(data: SendPolicy): void {
        this._data = data;
        this.generateShippingInformationComponent.generateShippingInformation({
            modalTitle: 'Enviar Póliza',
            modalMessage: 'enviar la póliza',
            modalIconClass: 'fa fa-send',
            modalActionName: 'Enviar Póliza',
            modalCancelRoute: data.cancelRoute,
            contactPhoneCode: data.phoneCode,
            contactPhoneNumber: data.phoneNumber,
            contactEmail: data.email,
        });
    }

    sendPolicyNotification(shippingInformation: ShippingInformation[]): void {
        this._loadingService.show();
        const requestBody: SendPolicyNotification = {
            workspaceId: this._authService.workspaceId,
            contactId: this._data!.contactId,
            policyId: this._data!.policyId,
            shippingChannels: shippingInformation,
        };
        this._policyService
            .sendPolicyNotification(requestBody)
            .subscribe((whatsappLink) => {
                this._loadingService.hide();
                if (whatsappLink) {
                    this.generateShippingInformationComponent.sendWhatsappMessage(
                        whatsappLink
                    );
                }
                this._updatePolicyContact(shippingInformation);
            });
    }

    private _updatePolicyContact(
        shippingChannels: ShippingInformation[]
    ): void {
        const requestBody = this._generatePolicyContact(shippingChannels);
        this._policyService
            .updatePolicyContact(
                this._data!.contactId,
                this._data!.policyId,
                requestBody
            )
            .subscribe(() => {
                this.policySent.emit();
            });
    }

    private _generatePolicyContact(
        shippingChannels: ShippingInformation[]
    ): UpdatePolicyContact {
        let titularEmail = '';
        let titularPhoneCode = '';
        let titularPhoneNumber = '';
        for (let channel of shippingChannels) {
            if (
                channel.shippingContactTypeId === SHIPPING_CONTACT_TYPES.EMAIL
            ) {
                titularEmail = channel.contact;
            }
            if (
                channel.shippingContactTypeId === SHIPPING_CONTACT_TYPES.PHONE
            ) {
                const arrPhone = channel.contact.split(',');
                titularPhoneCode = arrPhone[0];
                titularPhoneNumber = arrPhone[1];
            }
        }
        return {
            titularEmail,
            titularPhoneCodeId: this._phoneCodePipe.transform(titularPhoneCode),
            titularPhoneNumber,
        };
    }
}
