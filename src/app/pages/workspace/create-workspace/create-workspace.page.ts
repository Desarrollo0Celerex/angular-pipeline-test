import { Component, OnInit } from '@angular/core';

declare var Select2Plugin: any;

@Component({
  selector: 'agt-create-workspace',
  templateUrl: './create-workspace.page.html',
  styles: [
  ]
})
export class CreateWorkspacePage implements OnInit {

  constructor() { }

  ngOnInit(): void {
      Select2Plugin.init();
  }

}
