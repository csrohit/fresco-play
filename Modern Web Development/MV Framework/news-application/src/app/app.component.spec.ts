import { NewsActions } from './store/actions/news.actions';
import { NewsService } from './services/news.service';
import { StoreModule } from '@ngrx/store';
import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AppComponent } from './app.component';
import { SectionsComponent } from './components/sections/sections.component';
import { HeaderComponent } from './components/header/header.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RouterLinkStubDirective, RouterOutletStubComponent } from '../../testing/router-stubs';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.provideStore({}),
          RouterTestingModule
      ],
      providers: [NewsService, NewsActions],
      declarations: [
        AppComponent,
        SectionsComponent,
        HeaderComponent,
        NavbarComponent,
        RouterLinkStubDirective,
        RouterOutletStubComponent
      ],
    })
    .compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
