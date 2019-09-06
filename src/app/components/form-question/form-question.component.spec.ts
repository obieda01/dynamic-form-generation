import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { MatAutocompleteModule }  from "@angular/material";
import { HttpClientModule } from '@angular/common/http'; 
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MaterialModule } from '../../material/material.module';

import { FormQuestionComponent } from './form-question.component';
import { FormControlService } from '../../services/form-control.service';

let comp:    FormQuestionComponent;
let fixture: ComponentFixture<FormQuestionComponent>;
let elem:        HTMLElement;

describe('CardComponent & TestModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        FormQuestionComponent
      ],
      imports : [MaterialModule, FormsModule, ReactiveFormsModule, HttpClientModule  ],
      providers:[FormControlService]
     
    })
    .compileComponents().then(() => {
      
      fixture = TestBed.createComponent(FormQuestionComponent);
      comp    = fixture.componentInstance;
    });
  }));
  it('can instantiate the component', () => {
    expect(comp).not.toBeNull();
  });

  it('should create the app', async(() => {
    expect(comp).toBeTruthy();
  }));

  it('should display question text', () => {
    fixture.detectChanges();
    elem = fixture.nativeElement.querySelector('mat-label');
    expect(elem.textContent).toContain(comp.question.text);
  });
  
  it('should convert question text to mat-label ', () => {

    // get the name's input and display elements from the DOM
    const hostElement = fixture.nativeElement;
    const nameInput: HTMLInputElement = hostElement.querySelector('mat-label');
    const nameDisplay: HTMLElement = hostElement.querySelector('mat-label');
    console.log("sssss",nameDisplay.textContent );

    // simulate user entering a new name into the input box
    nameInput.value = 'quick BROWN  fOx';
  
    // dispatch a DOM event so that Angular learns of input value change.
    nameInput.dispatchEvent(new Event('mat-label'));
  
    // Tell Angular to update the display binding through the title pipe
    fixture.detectChanges();
  
    expect(nameDisplay.textContent).toBe('Quick Brown  Fox');
  });
  
});

