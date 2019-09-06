import { Injectable }   from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

// in-app imports 
import { QuestionAbstract } from '../models/question-abstract';

@Injectable()
export class FormControlService {
  
  constructor() { }

  /**
    * @desc take the questions and convert them to form group 
    * @param {QuestionAbstract} questions - The questions.
    * @return {FormGroup} group - 
  */
  toFormGroup(questions: QuestionAbstract[] ) {
    let group: any = {};
    if(questions != undefined){
      questions.forEach(question => {
        group[question.id] = question.required ? new FormControl(question.value , Validators.required)
                                                : new FormControl(question.value );
      });
    }
    return new FormGroup(group);
  }
}
