import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { CardContactConversionRateService } from './card-contact-conversion-rate.service';

@Component({
    selector: 'agt-card-contact-conversion-rate',
    templateUrl: './card-contact-conversion-rate.component.html',
    styles: [],
    providers: [CardContactConversionRateService],
    standalone: false
})
export class CardContactConversionRateComponent implements OnChanges {
    @Input() contactId: string = '';

    constructor(public cardContactConversionRateService: CardContactConversionRateService) { }

    ngOnChanges(changes: SimpleChanges): void {
        if(!!changes.contactId && !!changes.contactId.currentValue) {
            this.cardContactConversionRateService.loadConversionRate(changes.contactId.currentValue);
        }
    }

    get differencePercentage(): string {
        let differencePercentage: string;
        const difference: number = this.cardContactConversionRateService.conversionRate.workspace - this.cardContactConversionRateService.conversionRate.contact;
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
        if(this.cardContactConversionRateService.conversionRate.contact === this.cardContactConversionRateService.conversionRate.workspace) {
            rateColor = '';
        } else if(this.cardContactConversionRateService.conversionRate.contact > this.cardContactConversionRateService.conversionRate.workspace) {
            rateColor = 'text-success'
        } else {
            rateColor = 'text-danger';
        }
        return rateColor;
    }

    get rateIcon(): string {
        let rateIcon: string;
        if(this.cardContactConversionRateService.conversionRate.contact === this.cardContactConversionRateService.conversionRate.workspace) {
            rateIcon = '';
        } else if(this.cardContactConversionRateService.conversionRate.contact > this.cardContactConversionRateService.conversionRate.workspace) {
            rateIcon = 'fe-arrow-up'
        } else {
            rateIcon = 'fe-arrow-down';
        }
        return rateIcon;
    }

    get rateMessage(): string {
        let rateMessage: string;
        if(this.cardContactConversionRateService.conversionRate.contact === this.cardContactConversionRateService.conversionRate.workspace) {
            rateMessage = 'En promedio';
        } else if(this.cardContactConversionRateService.conversionRate.contact > this.cardContactConversionRateService.conversionRate.workspace) {
            rateMessage = 'Sobre el Promedio'
        } else {
            rateMessage = 'Debajo del Promedio';
        }
        return rateMessage;
    }

}
