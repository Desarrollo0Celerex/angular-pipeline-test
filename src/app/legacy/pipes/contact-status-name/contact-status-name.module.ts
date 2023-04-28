import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactStatusNamePipe } from './contact-status-name.pipe';



@NgModule({
  declarations: [ContactStatusNamePipe],
  exports: [ContactStatusNamePipe],
  imports: [
    CommonModule
  ]
})
export class ContactStatusNameModule { }
