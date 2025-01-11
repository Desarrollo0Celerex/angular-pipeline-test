import { Component, Input, OnInit } from '@angular/core';

declare var PopoverPlugin: any;

@Component({
    selector: 'agt-card-content-title',
    templateUrl: './card-content-title.component.html',
    styles: [],
    standalone: false
})
export class CardContentTitleComponent implements OnInit {
    @Input() title: string = '';
    @Input() description: string = '';

    ngOnInit(): void {
        PopoverPlugin.init();
    }
}
