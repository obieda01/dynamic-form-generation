import { Component,Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

// in-app imports 
import { FormControlService } from '../../services/form-control.service';
import { QuestionAbstract }  from '../../models/question-abstract';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})

export class FormComponent  {
  
  @Input() questions: QuestionAbstract[] = [];  // questions passed from the parent component
  form: FormGroup;
  payLoad = '';

   /**
   * create api instant to be used.
   * @param {ApiService} api - The api service.
   * @param {FormControlService} formControl - The formControl service.
   * @return {} The  value.
   */
  constructor(private formControl: FormControlService, private api: ApiService) {
   }

  ngOnChanges() {
    this.form = this.formControl.toFormGroup(this.questions);
  }

   /**
   * submit answers values to api service postAnswers().
   * @param {} 
   * @return {} .
   */
    onSubmit() {
      this.api.postAnswers(JSON.stringify(this.form.value));
    }
  

}
