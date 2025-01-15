import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'paymentTypeDescription',
    standalone: false
})
export class PaymentTypeDescriptionPipe implements PipeTransform {
    transform(isAutoPayment: string): string {
        return isAutoPayment === '1'
            ? 'El asegurado autorizó el cargo automático a su tarjeta.'
            : 'El asegurado realiza los pagos de forma manual.';
    }
}
