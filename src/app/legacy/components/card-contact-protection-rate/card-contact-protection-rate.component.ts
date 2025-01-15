import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { CardContactProtectionRateService } from './card-contact-protection-rate.service';

@Component({
    selector: 'agt-card-contact-protection-rate',
    templateUrl: './card-contact-protection-rate.component.html',
    styles: [],
    providers: [CardContactProtectionRateService],
    standalone: false
})
export class CardContactProtectionRateComponent implements OnChanges {
    @Input() contactId: string = '';

    constructor(public cardContactProtectionRateService: CardContactProtectionRateService) { }

    ngOnChanges(changes: SimpleChanges): void {
        if(!!changes.contactId && !!changes.contactId.currentValue) {
            this.cardContactProtectionRateService.loadProtectionRate(changes.contactId.currentValue);
        }
    }

    get differencePercentage(): string {
        let differencePercentage: string;
        const difference: number = this.cardContactProtectionRateService.protectionRate.workspace - this.cardContactProtectionRateService.protectionRate.contact;
        if(difference === 0) {
            differencePercentage = '';
        } else if(difference < 0) {
            differencePercentage = (difference * -1) + '%';
        } else {
            differencePercentage = difference + '%';
        }
        return differencePercentage;
    }

    get rateColor(): string {
        let rateColor: string;
        if(this.cardContactProtectionRateService.protectionRate.contact === this.cardContactProtectionRateService.protectionRate.workspace) {
            rateColor = '';
        } else if(this.cardContactProtectionRateService.protectionRate.contact > this.cardContactProtectionRateService.protectionRate.workspace) {
            rateColor = 'text-success'
        } else {
            rateColor = 'text-danger';
        }
        return rateColor;
    }

    get rateIcon(): string {
        let rateIcon: string;
        if(this.cardContactProtectionRateService.protectionRate.contact === this.cardContactProtectionRateService.protectionRate.workspace) {
            rateIcon = '';
        } else if(this.cardContactProtectionRateService.protectionRate.contact > this.cardContactProtectionRateService.protectionRate.workspace) {
            rateIcon = 'fe-arrow-up'
        } else {
            rateIcon = 'fe-arrow-down';
        }
        return rateIcon;
    }

    get rateMessage(): string {
        let rateMessage: string;
        if(this.cardContactProtectionRateService.protectionRate.contact === this.cardContactProtectionRateService.protectionRate.workspace) {
            rateMessage = 'En promedio';
        } else if(this.cardContactProtectionRateService.protectionRate.contact > this.cardContactProtectionRateService.protectionRate.workspace) {
            rateMessage = 'Sobre el Promedio'
        } else {
            rateMessage = 'Debajo del Promedio';
        }
        return rateMessage;
    }

}
