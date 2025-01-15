import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SelectShippingChannels } from '@shared/interfaces/select-shipping-channels.interface';
import { SHIPPING_CHANNELS } from '@core/constants/settings';
import { ShippingChannel } from '@shared/interfaces/shipping-channel.interface';

declare var ModalPlugin: any;
declare var PopoverPlugin: any;

@Component({
    selector: 'agt-modal-select-shipping-channels',
    templateUrl: './modal-select-shipping-channels.component.html',
    styles: [],
    standalone: false
})
export class ModalSelectShippingChannelsComponent {
    @Output() channelsSelected = new EventEmitter<number[]>();
    hasSelectedChannels = false;
    channels: ShippingChannel[] = this._generateShippingChannels();
    modalData: SelectShippingChannels | undefined = undefined;
    modalId = 'agt-modal-select-shipping-channels';

    emmitSelectedChannels(): void {
        if (this.hasSelectedChannels) {
            const selectedChannels = this._generateSelectedChannels();
            this._closeModal();
            this.channelsSelected.emit(selectedChannels);
        }
    }

    showModal(data: SelectShippingChannels): void {
        this.modalData = data;
        ModalPlugin.show(this.modalId);
        PopoverPlugin.init();
    }

    toggleChannel(event: any, index: number) {
        this.channels[index].isActive = event.target.checked;
        this._checkHasSelectedChannels();
    }

    private _closeModal(): void {
        ModalPlugin.hide(this.modalId);
    }

    private _generateSelectedChannels(): number[] {
        const selectedChannels: number[] = [];
        this.channels.forEach((channel) => {
            if (channel.isActive) {
                selectedChannels.push(channel.shippingChannelId);
            }
        });
        return selectedChannels;
    }

    private _checkHasSelectedChannels(): void {
        for (let channel of this.channels) {
            if (channel.isActive) {
                this.hasSelectedChannels = true;
                return;
            }
        }
        this.hasSelectedChannels = false;
    }

    private _generateShippingChannels(): ShippingChannel[] {
        return [
            {
                shippingChannelId: SHIPPING_CHANNELS.WHATSAPP,
                name: 'WhatsApp',
                description:
                    'Se enviará un mensaje personalizado por WhatsApp.',
                isActive: false,
            },
            {
                shippingChannelId: SHIPPING_CHANNELS.EMAIL,
                name: 'Correo Electrónico',
                description: 'Se enviará por correo eletrónico.',
                isActive: false,
            },
        ];
    }
}
