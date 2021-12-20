import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { AlternativexComponent } from './routes/alternativex/alternativex.component';
import { BlogComponent } from './routes/blog/blog.component';
import { FreedomComponent } from './routes/freedom/freedom.component';
import { ProjectsComponent } from './routes/projects/projects.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: IndexComponent },
  { path: 'alternativex', component: AlternativexComponent },
  { path: 'freedom', component: FreedomComponent },
  { path: 'blog', component: BlogComponent },
  { path: 'projects', component: ProjectsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
