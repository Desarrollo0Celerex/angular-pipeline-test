import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phoneNumberFormat'
})
export class PhoneNumberFormatPipe implements PipeTransform {

    transform(phoneNumber: string, phoneCode: string): string {
        return (!!phoneNumber) ? '+' + phoneCode + ' ' + phoneNumber  : '';
    }

}
