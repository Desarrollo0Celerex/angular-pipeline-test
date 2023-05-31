import { Component, OnInit } from '@angular/core';

declare var HorizontalMenuPlugin: any;

@Component({
    selector: 'agt-home',
    templateUrl: './home.layout.html',
    styles: [],
})
export class HomeLayout implements OnInit {
    ngOnInit(): void {
        HorizontalMenuPlugin.init();
    }
}
