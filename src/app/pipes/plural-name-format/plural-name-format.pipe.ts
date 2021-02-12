import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pluralNameFormat'
})
export class PluralNameFormatPipe implements PipeTransform {

    transform(name: string): string {
        if(!!name) {
            const lastChar: string = name.substr(name.length - 1);
            return (lastChar === 'l') ? `${name}es` : `${name}s` ;
        }
        return '';
    }

}
