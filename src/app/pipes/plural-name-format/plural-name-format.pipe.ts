import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pluralNameFormat'
})
export class PluralNameFormatPipe implements PipeTransform {

    transform(name: string): string {
        let pluralName: string = '';
        if(!!name) {
            switch(name) {
                case 'Cotización': pluralName = 'Cotizaciones'; break;
                case 'Ocasional': pluralName = 'Ocasionales'; break;
                case 'En Tiempo': pluralName = 'En Tiempo'; break;
                case 'Renovación': pluralName = 'Renovaciones'; break;
                case 'Reexpedición': pluralName = 'Reexpediciones'; break;
                case 'Familiar': pluralName = 'Familiares'; break;
                case 'del Grupo': pluralName = 'del Grupo'; break;
                default: pluralName = name + 's';
            }
        }
        return pluralName;
    }

}
