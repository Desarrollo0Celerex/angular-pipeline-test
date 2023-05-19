import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { CardContactSinistersRateService } from './card-contact-sinisters-rate.service';

@Component({
  selector: 'agt-card-contact-sinisters-rate',
  templateUrl: './card-contact-sinisters-rate.component.html',
  styles: [
  ],
  providers: [CardContactSinistersRateService]
})
export class CardContactSinistersRateComponent implements OnChanges {
    @Input() contactId: string = '';

    constructor(public cardContactSinistersRateService: CardContactSinistersRateService) { }

    ngOnChanges(changes: SimpleChanges): void {
        if(!!changes.contactId && !!changes.contactId.currentValue) {
            this.cardContactSinistersRateService.loadSinistersRate(changes.contactId.currentValue);
        }
    }

    get differencePercentage(): string {
        let differencePercentage: string;
        const difference: number = this.cardContactSinistersRateService.sinistersRate.workspace - this.cardContactSinistersRateService.sinistersRate.contact;
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
        if(this.cardContactSinistersRateService.sinistersRate.contact === this.cardContactSinistersRateService.sinistersRate.workspace) {
            rateColor = '';
        } else if(this.cardContactSinistersRateService.sinistersRate.contact > this.cardContactSinistersRateService.sinistersRate.workspace) {
            rateColor = 'text-danger'
        } else {
            rateColor = 'text-success';
        }
        return rateColor;
    }

    get rateIcon(): string {
        let rateIcon: string;
        if(this.cardContactSinistersRateService.sinistersRate.contact === this.cardContactSinistersRateService.sinistersRate.workspace) {
            rateIcon = '';
        } else if(this.cardContactSinistersRateService.sinistersRate.contact > this.cardContactSinistersRateService.sinistersRate.workspace) {
            rateIcon = 'fe-arrow-up'
        } else {
            rateIcon = 'fe-arrow-down';
        }
        return rateIcon;
    }

    get rateMessage(): string {
        let rateMessage: string;
        if(this.cardContactSinistersRateService.sinistersRate.contact === this.cardContactSinistersRateService.sinistersRate.workspace) {
            rateMessage = 'En promedio';
        } else if(this.cardContactSinistersRateService.sinistersRate.contact > this.cardContactSinistersRateService.sinistersRate.workspace) {
            rateMessage = 'Sobre el Promedio'
        } else {
            rateMessage = 'Debajo del Promedio';
        }
        return rateMessage;
    }

}
