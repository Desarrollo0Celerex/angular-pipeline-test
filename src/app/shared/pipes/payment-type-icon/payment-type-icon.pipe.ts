import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'paymentTypeIcon',
})
export class PaymentTypeIconPipe implements PipeTransform {
    transform(isAutoPayment: string): string {
        return isAutoPayment === '1' ? 'fe-refresh-cw' : 'fe-pocket';
    }
}
