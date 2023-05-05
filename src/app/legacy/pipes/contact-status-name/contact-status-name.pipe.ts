import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'contactStatusName',
})
export class ContactStatusNamePipe implements PipeTransform {
    transform(clientStatusName: string, leadStatusName: string): string {
        let contactStatusName: string = '';
        if (!!clientStatusName) {
            contactStatusName = 'Cliente';
        } else if (!!leadStatusName) {
            contactStatusName = 'Prospecto';
        } else {
            contactStatusName = 'Contacto';
        }
        return contactStatusName;
    }
}
