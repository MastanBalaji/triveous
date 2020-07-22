import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class CommonserviceService {

  constructor(private http:HttpClient) { }

  getdata(data,category){
    return this.http.get('http://newsapi.org/v2/everything?q='+data+'&from=2020-06-22&sortBy='+category+'&apiKey=8a3f2ccb5c30442ca99d8e4853809b8a')
  }
}
