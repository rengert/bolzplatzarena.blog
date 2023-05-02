import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GameComponent } from './components/game/game.component';
import { NonogrammComponent } from './components/nonogramm.component';
import { SettingsComponent } from './components/settings/settings.component';

import { NonogrammRoutingModule } from './nonogramm-routing.module';
import { BoardComponent } from './components/game/board/board.component';
import { BlockComponent } from './components/game/board/block/block.component';
import { CaptionComponent } from './components/game/board/caption/caption.component';
import { HeartsComponent } from './components/game/board/hearts/hearts.component';
import { SettingsViewComponent } from './components/game/board/settings-view/settings-view.component';


@NgModule({
  declarations: [
    NonogrammComponent,
    GameComponent,
    SettingsComponent,
    BoardComponent,
    BlockComponent,
    CaptionComponent,
    HeartsComponent,
    SettingsViewComponent,
  ],
  imports: [
    CommonModule,
    NonogrammRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class NonogrammModule {
}
