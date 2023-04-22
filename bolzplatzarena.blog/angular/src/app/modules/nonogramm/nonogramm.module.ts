import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NonogrammComponent } from './components/nonogramm.component';

import { NonogrammRoutingModule } from './nonogramm-routing.module';


@NgModule({
  declarations: [
    NonogrammComponent,
  ],
  imports: [
    CommonModule,
    NonogrammRoutingModule,
  ],
})
export class NonogrammModule {
}
