import { Component, OnInit } from '@angular/core';

// in-app imports 
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],

})
export class AppComponent implements OnInit {
  questions; 

  /**
   * create api instant to be used.
   * @param {ApiService} api - The api service.
   * @return {} The  value.
   */
  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.showQuestions();
  }


  /**
   * get questions using the api service getQuestions().
   * @param {} 
   * @return {} set questions to the data returned from the api call.
   */
    showQuestions() {
      this.api.getQuestions()
          .subscribe((data) => {
            this.questions = data;
          });
  }
}
