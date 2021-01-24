import { Component, OnInit } from '@angular/core';

import { WelcomeService } from './welcome.service';

@Component({
  selector: 'agt-welcome',
  templateUrl: './welcome.page.html',
  styles: [
  ]
})
export class WelcomePage implements OnInit {

    constructor(public welcomeService: WelcomeService) { }

    ngOnInit(): void {
        this.welcomeService.uploadUser('AID20200521NZIYH');
    }

}
