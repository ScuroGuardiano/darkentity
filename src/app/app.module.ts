import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IndexComponent } from './index/index.component';
import { AlternativexComponent } from './routes/alternativex/alternativex.component';
import { MenuComponent } from './components/menu/menu.component';
import { FreedomComponent } from './routes/freedom/freedom.component';
import { BlogComponent } from './routes/blog/blog.component';
import { ProjectsComponent } from './routes/projects/projects.component';
import { PostsComponent } from './components/posts/posts.component';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    AlternativexComponent,
    MenuComponent,
    FreedomComponent,
    BlogComponent,
    ProjectsComponent,
    PostsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
