import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImageAgenthosBotModule } from '@components/image-agenthos-bot/image-agenthos-bot.module';

import { ContentSuggestionsComponent } from './content-suggestions.component';

@NgModule({
  declarations: [ContentSuggestionsComponent],
  exports: [ContentSuggestionsComponent],
  imports: [
    CommonModule,
    ImageAgenthosBotModule
  ]
})
export class ContentSuggestionsModule { }
