import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'paymentTypeName',
    standalone: false
})
export class PaymentTypeNamePipe implements PipeTransform {
    transform(isAutoPayment: string): string {
        return isAutoPayment === '1' ? 'Pago Automático' : 'Pago Manual';
    }
}
