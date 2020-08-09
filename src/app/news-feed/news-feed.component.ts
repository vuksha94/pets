import { Component, OnInit } from '@angular/core';
import { PetService } from '../_services';

@Component({
  selector: 'app-news-feed',
  templateUrl: './news-feed.component.html',
  styleUrls: ['./news-feed.component.css']
})
export class NewsFeedComponent implements OnInit {

  newsFeed: any[];
  // firstDot: number[];
  constructor(private petService: PetService) { }

  ngOnInit() {
    this.petService.getNewsFeed()
    .subscribe(
      data => {
        this.newsFeed = data;
        // calculate first appearence of the '.' in news's bodies
        this.newsFeed.forEach(
          news => {
            let pos = news.body.indexOf('.');
            if (pos === -1) {
              pos = news.body.length;
            }
            news.body = news.body.substring(0, pos);
          }
        )
      },
      err => console.log(err)
      );
  }

}
