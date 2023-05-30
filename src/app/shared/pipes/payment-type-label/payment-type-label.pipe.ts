import { Pipe, PipeTransform } from '@angular/core';
import { PAYMENT_SOURCE_TYPES } from '@core/constants/settings';

@Pipe({
    name: 'paymentTypeLabel',
})
export class PaymentTypeLabelPipe implements PipeTransform {
    transform(paymentSourceTypeId: number): string {
        return paymentSourceTypeId === PAYMENT_SOURCE_TYPES.POLICY
            ? 'No. Póliza'
            : 'No. Endoso';
    }
}
