import { Component, OnInit } from '@angular/core';
import { CommonserviceService } from './service/commonservice.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  load: boolean = false;
  load1: boolean = false;
  searchstring: string = '';
  newsarray: any = [];
  categoryarray: any = [];
  news: string = '';
  category: string = '';
  selectednews: any = [];
  error: string = '';
  sidearray = [
    {
      name: 'LATEST',
      category: 'publishedAt'
    },
    {
      name: 'TOP',
      category: 'popularity'
    },
    {
      name: 'FEATURED',
      category: 'relevancy'
    }
  ]
  navbar = [
    {
      name: 'HOME',
      id: '1'
    },
    {
      name: 'WORLD',
      id: '2'
    },
    {
      name: 'GYM',
      id: '3'
    },
    {
      name: 'SCIENCE',
      id: '4'
    },
    {
      name: 'TECH',
      id: '5'
    },
    {
      name: 'TRAVEL',
      id: '6'
    },
    {
      name: 'SPORTS',
      id: '7'
    },
    {
      name: 'HEALTH',
      id: '8'
    },
  ]
  mainnews = {
    img: '',
    content: ''
  }

  constructor(private commonservice: CommonserviceService) {

  }

  ngOnInit() {
    this.newsarray = [];
    this.news = 'world';
    this.getnews('Home', 'popularity');
    this.getcategory('Home', 'publishedAt')
  }

  getnews(newsstring, category) {
    this.searchstring = '';
    this.load = false;
    this.news = newsstring;
    this.category = category
    this.commonservice.getdata(this.news, this.category).subscribe((data: any) => {
      this.newsarray = [];
      if (data && data.articles) {
        if (data && data.articles.length) {
          for (let i = 0; i < 4; i++) {
            this.newsarray.push(data.articles[i]);
          }
          this.selectcontent(data.articles[0]);
          this.getcategory(newsstring, 'publishedAt');
        }
        else {
          this.error = "'Searched data not found'";
        }

      }
      else {
        this.error = "something went wrong!"
      }
      setTimeout(() => {
        this.load = true;
      }, 1000);
    })
  }


  getcategory(newsstring, category) {
    this.load1 = false;
    this.news = newsstring;
    this.category = category;
    this.commonservice.getdata(this.news, this.category).subscribe((data: any) => {
      this.categoryarray = [];
      if (data && data.articles.length) {
        for (let i = 0; i < data.articles.length; i++) {
          this.categoryarray.push(data.articles[i]);
        }
      }
      setTimeout(() => {
        this.load1 = true;
      }, 1000);
    })
  }

  selectcontent(data) {
    this.mainnews = {
      img: data.urlToImage,
      content: data.content
    }
  }

}
