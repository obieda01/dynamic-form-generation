import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { QuestionAbstract }  from '../models/question-abstract';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
   questionsUrl = 'https://pengwinning.boldpenguin.com/api/questions';
   searchUrl = 'https://pengwinning.boldpenguin.com/api/naics/search';
   postUrl ='https://pengwinning.boldpenguin.com/api/application_forms'
  constructor(private http: HttpClient) { }
 
  /**
    * @desc get questions using API http request 
    * @param none
    * @return bool - success or failure
  */
  getQuestions() {
     //return this.http.get('assets/helper.json');
    return this.http.get(this.questionsUrl, httpOptions)    
  }
  
  postAnswers (customerAnswers) {
    this.http.post(this.postUrl, customerAnswers,{ 
      observe: 'response',
      headers: httpOptionsPSt.headers,
      responseType:"json"

      } )
    .subscribe(
      (val) => {
          console.log("POST call successful value returned in body", 
                      val);
      },
      response => {
          console.log("POST call in error", response);
      },
      () => {
          console.log("The POST observable is now completed.");
      });
      console.log("POST call successful value returned in body", 
      customerAnswers);
    
    }

  search(query: string): Observable<any> {
    return this.http.get<any>(this.searchUrl,{ 
      observe: 'response',
      headers: httpOptions.headers,
      params: {
        q: query,
        sort: 'stars',
        order: 'desc'
      }
    } )
    .pipe(
      map(res => {
        return res.body;
      })
    );
  }
}

const httpOptions = {
  headers: new HttpHeaders({
    'Authorization': 'Bearer e60ce72ecdebc37631b0cc1de13a2f15'

  })
}
const httpOptionsPSt = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'Bearer e60ce72ecdebc37631b0cc1de13a2f15'
  })
};
