import { Pipe, PipeTransform } from '@angular/core';
import { PAYMENT_SOURCE_TYPES } from '@configs/constants.config';

@Pipe({
    name: 'paymentSourceTypeName',
})
export class PaymentSourceTypeNamePipe implements PipeTransform {
    transform(paymentSourceTypeId: number): string {
        let name: string;
        switch (paymentSourceTypeId) {
            case PAYMENT_SOURCE_TYPES.POLICY:
                name = 'Recibo de póliza';
                break;
            case PAYMENT_SOURCE_TYPES.ENDORSEMENT:
                name = 'Recibo de endoso';
                break;
            case PAYMENT_SOURCE_TYPES.FRACTION:
                name = 'Recibo fraccionado';
                break;
            default:
                name = '';
                break;
        }
        return name;
    }
}
