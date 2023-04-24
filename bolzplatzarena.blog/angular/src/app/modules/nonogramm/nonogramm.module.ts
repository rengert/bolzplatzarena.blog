import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GameComponent } from './components/game/game.component';
import { NonogrammComponent } from './components/nonogramm.component';
import { SettingsComponent } from './components/settings/settings.component';

import { NonogrammRoutingModule } from './nonogramm-routing.module';


@NgModule({
  declarations: [
    NonogrammComponent,
    GameComponent,
    SettingsComponent,
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
