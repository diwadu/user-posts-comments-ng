import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopMenuComponent } from './top-menu/top-menu.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { PostsComponent } from './posts/posts.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TruncatePipe } from './truncate.pipe';
import { MyHttpInterceptor } from './common/http-interceptor';
import * as AnythingThatIsNotDollarSignOrSymbolOrjQuery from "jquery"


@NgModule({
  declarations: [
    AppComponent,
    TopMenuComponent,
    HomeComponent,
    AboutComponent,
    PostsComponent,
    TruncatePipe,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: MyHttpInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
