import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'plural',
})
export class PluralPipe implements PipeTransform {
    transform(name: string, quantity?: number): string {
        if (quantity && quantity === 1) {
            return name;
        }
        let pluralName: string;
        switch (name) {
            case 'Cotización':
                pluralName = 'Cotizaciones';
                break;
            case 'Ocasional':
                pluralName = 'Ocasionales';
                break;
            case 'En Tránsito':
                pluralName = 'En Tránsito';
                break;
            case 'En Tiempo':
                pluralName = 'En Tiempo';
                break;
            case 'Renovación':
                pluralName = 'Renovaciones';
                break;
            case 'Reexpedición':
                pluralName = 'Reexpediciones';
                break;
            case 'Familiar':
                pluralName = 'Familiares';
                break;
            case 'del Grupo':
                pluralName = 'del Grupo';
                break;
            case 'del Socio':
                pluralName = 'del Socio';
                break;
            case 'Cancelación':
                pluralName = 'Cancelaciones';
                break;
            default:
                pluralName = name + 's';
        }
        return pluralName;
    }
}
