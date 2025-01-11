import { Pipe, PipeTransform } from '@angular/core';

import { CONTENT_TYPES } from '@constants/global';

@Pipe({
    name: 'labelFoundFormat',
    standalone: false
})
export class LabelFoundFormatPipe implements PipeTransform {

    transform(contentType: number): string {
        let label: string;
        switch(contentType) {
            case CONTENT_TYPES.CONTACT_QUOTATION.ID:
            case CONTENT_TYPES.POLICY.ID:
            case CONTENT_TYPES.COINCIDENCES.ID:
                label = 'Encontrada';
            break;

            default:
                label = 'Encontrado';
        }
        return label;
    }

}
