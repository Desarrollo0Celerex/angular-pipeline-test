import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pluralNameFormat'
})
export class PluralNameFormatPipe implements PipeTransform {

    transform(name: string): string {
        let pluralName: string = '';
        if(!!name) {
            switch(name) {
                case 'Cotización':
                    pluralName = 'Cotizaciones';
                break;

                default:
                pluralName = name + 's';
            }
        }
        return pluralName;
    }

}
