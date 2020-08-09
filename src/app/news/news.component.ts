import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PetService } from '../_services';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  selectedId: string;
  news: any;
  constructor(private route: ActivatedRoute,
              private petService: PetService
              ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.selectedId = params['id'];
      this.petService.getNews(this.selectedId)
      .subscribe(
        data => this.news = data[0],
        err => console.log(err)
      );
    });
  }

}
