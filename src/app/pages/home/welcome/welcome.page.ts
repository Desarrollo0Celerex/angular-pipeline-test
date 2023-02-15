import { Component, OnInit } from '@angular/core';

import { ROUTES_NAME } from '@constants/routes-name';

@Component({
  selector: 'agt-welcome',
  templateUrl: './welcome.page.html',
  styles: [
  ]
})
export class WelcomePage {
  ROUTES_NAME: any = ROUTES_NAME;
}
