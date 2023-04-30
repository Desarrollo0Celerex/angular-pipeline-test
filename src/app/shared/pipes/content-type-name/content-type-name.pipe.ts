import { Pipe, PipeTransform } from '@angular/core';

import { CONTENT_TYPES } from '@configs/constants.config';

@Pipe({
    name: 'contentTypeName',
})
export class ContentTypeNamePipe implements PipeTransform {
    transform(contentType?: number): string {
        let name: string;
        switch (contentType) {
            case CONTENT_TYPES.PAYMENTS:
                name = 'Pago';
                break;

            default:
                name = '';
                break;
        }
        return name;
    }
}
