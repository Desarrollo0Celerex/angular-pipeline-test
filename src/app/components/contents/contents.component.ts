import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'agt-contents',
  templateUrl: './contents.component.html',
  styles: [
  ]
})
export class ContentsComponent implements OnInit {
    @Input() contentType: number;

    constructor() {
        this.contentType = 0;
    }

    ngOnInit(): void {
    }

}
