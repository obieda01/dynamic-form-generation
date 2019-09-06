import { Component, OnInit, Input } from '@angular/core';

// in-app imports 
import { QuestionAbstract }  from '../../models/question-abstract';
import { FormControlService } from '../../services/form-control.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']

})
export class CardComponent  {

  @Input() questions: QuestionAbstract[] = []; // questions passed from the parent component

  /**
   * .
   * @param {} 
   * @return {} 
   */
  constructor() { }
 
}
