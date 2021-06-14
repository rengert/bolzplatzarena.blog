import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CmsComponent } from './components/cms/cms.component';
import { TagsComponent } from './components/tags/tags.component';

const routes: Routes = [
  { path: 'tags/:tag', component: TagsComponent },
  { path: '**', component: CmsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
