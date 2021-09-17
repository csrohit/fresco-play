import { Injectable } from '@angular/core';
import { Http }       from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { News, NewsResponse } from '../model/news';
import 'rxjs/add/operator/map';

@Injectable()
export class NewsService {

  constructor() { }

  getSectionNews(sectionName: string): any {
    // fetch news of that sectionName
  }
}
