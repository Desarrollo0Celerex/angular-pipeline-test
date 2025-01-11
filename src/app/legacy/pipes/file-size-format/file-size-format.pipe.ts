import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'fileSizeFormat',
    standalone: false
})
export class FileSizeFormatPipe implements PipeTransform {

    transform(fileSize: string): string {
        const megabytes: string = ((parseInt(fileSize) / 1024) / 1024).toFixed(2);
        return megabytes + ' Mb.';
    }

}
