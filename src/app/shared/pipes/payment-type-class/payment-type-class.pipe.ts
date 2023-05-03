import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'paymentTypeClass',
})
export class PaymentTypeClassPipe implements PipeTransform {
    transform(isAutoPayment: string): string {
        return isAutoPayment === '1' ? 'success' : 'warning';
    }
}
