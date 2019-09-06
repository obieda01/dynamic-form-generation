import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, of } from 'rxjs';
import {
  startWith,
  map,
  debounceTime,
  switchMap,
  catchError
} from 'rxjs/operators';

// in-app imports 
import { ApiService } from '../../services/api.service';
import { QuestionAbstract }  from '../../models/question-abstract';
import {FormControl} from '@angular/forms';


@Component({
  selector: 'app-form-question',
  templateUrl: './form-question.component.html',
  styleUrls: ['./form-question.component.css']
})
export class FormQuestionComponent implements OnInit {

  @Input() question: QuestionAbstract; // questions passed from the parent component
  @Input() form: FormGroup;            // form group passed from the parent component
  naicsAutoComplete: Observable<any> = null;
  autoCompleteControl = new FormControl();
  
  /**
   * create api instant to be used.
   * @param {ApiService} api - The api service.
   * @return {} The  value.
  */
  constructor(private api: ApiService) { }


  ngOnInit() {

    this.naicsAutoComplete = this.form.get('4').valueChanges.pipe(
      startWith(''),
      // delay emits
      debounceTime(300),
      // use switch map so as to cancel previous subscribed events, before creating new once
      switchMap(value => {
        if (value !== '') {
          // lookup from NAICS 
          return this.lookup(value);
        } else {
          // if no value is pressent, return null
          return of(null);
        }
      })
    );
  }
 

  /**
   * create api instant to be used.
   * @param {string} value - The api service.
   * @return {} The  value.
  */
  lookup(value: string): Observable<any> {
 
    return this.api.search(value).pipe(
      map(results => results),
      // catch errors
      catchError(_ => {
        return of(null);
      })
    );
  }
}
