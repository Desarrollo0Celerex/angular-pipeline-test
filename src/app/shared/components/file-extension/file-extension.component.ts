import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FileHelper } from '@core/helpers/file.helper';

@Component({
    selector: 'agt-file-extension',
    templateUrl: './file-extension.component.html',
    styles: [],
})
export class FileExtensionComponent implements OnChanges {
    @Input() fileUrl = '';
    fileExtension = '';

    ngOnChanges(changes: SimpleChanges): void {
        this.fileExtension = FileHelper.getFileExtension(
            changes.fileUrl.currentValue
        );
    }
}
