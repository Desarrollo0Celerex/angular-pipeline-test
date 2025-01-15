import { Pipe, PipeTransform } from '@angular/core';
import { PAYMENT_SOURCE_TYPES } from '@core/constants/settings';

@Pipe({
    name: 'paymentTypeValue',
    standalone: false
})
export class PaymentTypeValuePipe implements PipeTransform {
    transform(
        paymentSourceTypeId: number,
        policyNumber: string | null = null,
        endorsementNumber: string | null = null
    ): string {
        const label: string | null =
            paymentSourceTypeId === PAYMENT_SOURCE_TYPES.POLICY
                ? policyNumber
                : endorsementNumber;
        return label ? label : '';
    }
}
