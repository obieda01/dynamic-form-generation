import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { CardComponent } from './card.component';
import { FormControlService } from '../../services/form-control.service';
import { MaterialModule } from '../../material/material.module';


@Component({selector: 'app-form', template: ''})
class FormStubComponent {}

let comp:    CardComponent;
let fixture: ComponentFixture<CardComponent>;
let h1:        HTMLElement;

describe('CardComponent & TestModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CardComponent,
        FormStubComponent        
      ],
      imports : [MaterialModule  ],
      providers:[FormControlService],
      schemas: [ NO_ERRORS_SCHEMA ]
     
    })
    .compileComponents().then(() => {
      fixture = TestBed.createComponent(CardComponent);
      comp    = fixture.componentInstance;
    });
  }));
  it('can instantiate the component', () => {
    expect(comp).not.toBeNull();
  });

  it('should create the app', async(() => {
    expect(comp).toBeTruthy();
  }));

  
  
});

