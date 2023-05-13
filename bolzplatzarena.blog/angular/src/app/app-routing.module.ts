import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CmsComponent } from './components/cms/cms.component';
import { TagsComponent } from './components/tags/tags.component';

const routes: Routes = [
  { path: 'tags/:tag', component: TagsComponent },
  {
    path: 'nonogramm',
    loadChildren: () => import('./modules/nonogramm/nonogramm.module').then(m => m.NonogrammModule),
  },
  { path: '**', component: CmsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
