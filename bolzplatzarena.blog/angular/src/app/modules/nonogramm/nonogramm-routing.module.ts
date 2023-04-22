import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NonogrammComponent } from './components/nonogramm.component';

const routes: Routes = [{ path: '', component: NonogrammComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NonogrammRoutingModule {
}
