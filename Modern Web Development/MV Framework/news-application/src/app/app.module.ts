/***** Modules *****/
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';

/***** Components *****/
import { AppComponent } from './app.component';
import { NewsComponent } from './components/news/news.component';
import { HeaderComponent } from './components/header/header.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NewsItemComponent } from './components/news/news-item/news-item.component';
import { SectionsComponent } from './components/sections/sections.component';

/***** Services *****/
import { NewsService } from './services/news.service';
import { routes } from './routes';
import { news } from './store/reducers/news.reducer';
import { sections } from './store/reducers/sections.reducer';
import { NewsActions } from './store/actions/news.actions';


@NgModule({
  declarations: [
    AppComponent,
    NewsComponent,
    HeaderComponent,
    NavbarComponent,
    NewsItemComponent,
    SectionsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes),
    StoreModule.provideStore({ sections, news })
  ],
  providers: [NewsService, NewsActions],
  bootstrap: [AppComponent]
})
export class AppModule { }
