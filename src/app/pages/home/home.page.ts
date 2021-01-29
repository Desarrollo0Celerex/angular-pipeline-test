import { Component, OnInit } from '@angular/core';

declare var HorizontalMenuPlugin: any;

@Component({
  selector: 'agt-home',
  templateUrl: './home.page.html',
  styles: [
  ]
})
export class HomePage implements OnInit {

    constructor() { }

    ngOnInit(): void {
        HorizontalMenuPlugin.init();
    }

}
