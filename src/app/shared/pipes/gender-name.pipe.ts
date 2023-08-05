import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'genderName',
})
export class GenderNamePipe implements PipeTransform {
    transform(genderId: string): string {
        return genderId == '1' ? 'Hombre' : 'Mujer';
    }
}
