import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'genderName',
    standalone: false
})
export class GenderNamePipe implements PipeTransform {
    transform(genderId: string): string {
        switch (parseInt(genderId)) {
            case 1:
                return 'Hombre';
            case 2:
                return 'Mujer';
            default:
                return '';
        }
    }
}
