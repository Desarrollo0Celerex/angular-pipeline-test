import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DumbComponent } from '@core/classes/dumb-component';
import { Payment } from '@core/interfaces/payment.interface';

@Component({
    selector: 'agt-payment-list',
    templateUrl: './payment-list.component.html',
    styles: [],
})
export class PaymentListComponent extends DumbComponent {
    @Input() canShowNoResultsAction: boolean = false;
    @Input() contentName: string = '';
    @Input() isLoadedContent: boolean = false;
    @Input() isLoadingContent: boolean = false;
    @Input() noResultsDetails: string = '';
    @Input() noResultsMessage: string = '';
    @Input() payments: Payment[] = [];
    @Input() totalItems: number = 0;
    @Output() loadMoreContents: EventEmitter<void> = new EventEmitter<void>();

    constructor() {
        super();
    }

    get hasResults(): boolean {
        return this.payments.length > 0;
    }

    requestLoadMoreContents(): void {
        this.loadMoreContents.emit();
    }

    showModalToSelectContactAction(): void {
        console.log('Mostrar modal para seleccionar la acción del contacto.');
    }
}
