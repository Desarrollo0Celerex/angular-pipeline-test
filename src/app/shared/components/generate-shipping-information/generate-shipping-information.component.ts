import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { ModalSelectShippingChannelsComponent } from '../modal-select-shipping-channels/modal-select-shipping-channels.component';
import { GenerateShippingInformation } from '@shared/interfaces/generate-shipping-information.interface';
import { ShippingInformation } from '@shared/interfaces/shipping-information.interface';
import {
    SHIPPING_CHANNELS,
    SHIPPING_CONTACT_TYPES,
} from '@core/constants/settings';
import { ModalRequestShippingContactsComponent } from '../modal-request-shipping-contacts/modal-request-shipping-contacts.component';
import { ShippingContact } from '@shared/interfaces/shipping-contact.interface';

@Component({
    selector: 'agt-generate-shipping-information',
    templateUrl: './generate-shipping-information.component.html',
    styles: [],
    standalone: false
})
export class GenerateShippingInformationComponent {
    @Output() shippingInformationGenerated = new EventEmitter<
        ShippingInformation[]
    >();
    @ViewChild(ModalRequestShippingContactsComponent)
    modalRequestShippingContactsComponent!: ModalRequestShippingContactsComponent;
    @ViewChild(ModalSelectShippingChannelsComponent)
    modalSelectShippingChannelsComponent!: ModalSelectShippingChannelsComponent;
    data: GenerateShippingInformation | undefined = undefined;
    contactTypesToRequest: number[] = [];
    shippingInformation: ShippingInformation[] = [];

    checkChannelsSelected(selectedChannels: number[]): void {
        if (selectedChannels.length > 0) {
            this.shippingInformation =
                this._generateShippingInformation(selectedChannels);
            this.contactTypesToRequest = this._generateContactTypesToRequest(
                this.shippingInformation
            );
            if (this.contactTypesToRequest.length > 0) {
                this._showModalToRequestShippingContacts(
                    this.contactTypesToRequest
                );
            } else {
                this._emitShippingInformation();
            }
        }
    }

    checkContactsRequested(contactsRequested: ShippingContact): void {
        this.shippingInformation = this.shippingInformation.map((element) => {
            if (
                element.shippingContactTypeId ===
                    SHIPPING_CONTACT_TYPES.EMAIL &&
                this._hasContactTypeToRequest(SHIPPING_CONTACT_TYPES.EMAIL)
            ) {
                element.contact = contactsRequested.email;
            } else if (
                element.shippingContactTypeId ===
                    SHIPPING_CONTACT_TYPES.PHONE &&
                this._hasContactTypeToRequest(SHIPPING_CONTACT_TYPES.PHONE)
            ) {
                element.contact =
                    contactsRequested.phoneCode +
                    ',' +
                    contactsRequested.phoneNumber;
            }
            return element;
        });
        this._emitShippingInformation();
    }

    generateShippingInformation(data: GenerateShippingInformation): void {
        this.data = data;
        this.shippingInformation = [];
        this._showModalToSelectShippingChannels();
    }

    sendWhatsappMessage(link: string): void {
        const a = document.createElement('a');
        a.target = '_blank';
        a.href = link;
        a.click();
        a.remove();
    }

    private _emitShippingInformation(): void {
        this.shippingInformationGenerated.emit(this.shippingInformation);
    }

    private _generateContactTypesToRequest(
        shippingInformation: ShippingInformation[]
    ): number[] {
        const contactTypesToRequest: number[] = [];
        shippingInformation.forEach((elemtent) => {
            if (!elemtent.contact) {
                contactTypesToRequest.push(elemtent.shippingContactTypeId);
            }
        });
        return contactTypesToRequest;
    }

    private _generateShippingInformation(
        channels: number[]
    ): ShippingInformation[] {
        const shippingInformation: ShippingInformation[] = [];
        channels.forEach((channel) => {
            switch (channel) {
                case SHIPPING_CHANNELS.WHATSAPP:
                    shippingInformation.push({
                        shippingChannelId: channel,
                        shippingContactTypeId: SHIPPING_CONTACT_TYPES.PHONE,
                        contact: this.data?.contactPhoneNumber
                            ? this.data!.contactPhoneCode +
                              ',' +
                              this.data.contactPhoneNumber
                            : '',
                    });
                    break;

                case SHIPPING_CHANNELS.EMAIL:
                    shippingInformation.push({
                        shippingChannelId: channel,
                        shippingContactTypeId: SHIPPING_CONTACT_TYPES.EMAIL,
                        contact: this.data?.contactEmail || '',
                    });
                    break;
            }
        });
        return shippingInformation;
    }

    private _hasContactTypeToRequest(contactType: number): boolean {
        return this.contactTypesToRequest.includes(contactType);
    }

    private _showModalToRequestShippingContacts(contactTypes: number[]): void {
        this.modalRequestShippingContactsComponent.showModal({
            contactTypes,
            modalTitle: this.data!.modalTitle,
            modalMessage: this.data!.modalMessage,
            modalIconClass: this.data!.modalIconClass,
            modalActionName: this.data!.modalActionName,
            modalCancelRoute: this.data!.modalCancelRoute,
        });
    }

    private _showModalToSelectShippingChannels(): void {
        this.modalSelectShippingChannelsComponent.showModal({
            modalTitle: this.data!.modalTitle,
            modalMessage: this.data!.modalMessage,
            modalIconClass: this.data!.modalIconClass,
            modalActionName: this.data!.modalActionName,
            modalCancelRoute: this.data!.modalCancelRoute,
        });
    }
}
