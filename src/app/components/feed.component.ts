import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { CommonModule } from "@angular/common";
import { NgIf } from '@angular/common'; // Explicit import
//import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
 import {HttpClientModule} from '@angular/common/http';
import { RouterOutlet } from '@angular/router';
import {PaginationComponent} from './pagination.component';

import {AtomFeed} from '../models/atom-feed';
import {finalize} from 'rxjs/operators';
import {AtomEntry} from '../models/atom-entry';
import {TopWord} from '../models/top-word';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-feed',standalone:true,
    imports: [   
    ReactiveFormsModule, CommonModule,PaginationComponent
      ], //HttpClientModule,RouterOutlet NgIf
  templateUrl: './feed.component.html'
})
export class FeedComponent implements OnInit {
  title = 'Feed';
  public feed: AtomFeed |null  = null;
  public entries: AtomEntry[] = [];
  public topWords: TopWord[] = [];
  ui = {
    loading: false,
    error: '' ,
    pageSize: 5,
    page:0
  };

  constructor(private http: HttpClient, private route: ActivatedRoute, private location: Location) {

  }

  ngOnInit(): void {
    this.ui.loading = true;
    let tk = this.route.snapshot.paramMap.get('page');
    this.ui.page = parseInt(tk !==null ? tk: '0', 10);
    this.http.get('/feed', {responseType: 'text'}).pipe(
      finalize(() => this.ui.loading = false)
    ).subscribe(xml => {
      const feed = new AtomFeed(xml);
      if (!feed.error) {
        this.feed = feed;
        this.topWords = this.feed.getTopWords(10);
      } else {
        this.ui.error = feed.error;
      }
    }, () => this.ui.error = 'Unable to load feed');
  }

  onPageChange(page :any) {
    const offset = (page - 1) * this.ui.pageSize;
    this.entries = this.feed!.entries.slice(offset, offset + this.ui.pageSize);
    this.location.replaceState('/feed/' + page);
  }

}
