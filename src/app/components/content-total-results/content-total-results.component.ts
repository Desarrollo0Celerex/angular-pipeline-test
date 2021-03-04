import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'agt-content-total-results',
  templateUrl: './content-total-results.component.html',
  styles: [
  ]
})
export class ContentTotalResultsComponent implements OnInit {
    @Input() query: string;
    @Input() totalResults: number;

    constructor() {
        this.query = '';
        this.totalResults = 0;
    }

    ngOnInit(): void {
    }

}
