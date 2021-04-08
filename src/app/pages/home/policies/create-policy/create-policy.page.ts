import { Component, OnInit } from '@angular/core';

import { CreatePolicyService } from './create-policy.service';

@Component({
  selector: 'agt-create-policy',
  templateUrl: './create-policy.page.html',
  styles: [
  ]
})
export class CreatePolicyPage implements OnInit {

    constructor(private _createPolicyService: CreatePolicyService) { }

    ngOnInit(): void {
    }

}
