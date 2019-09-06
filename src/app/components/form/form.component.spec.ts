import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component,DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; 
import { FormComponent } from './form.component';
import { FormControlService } from '../../services/form-control.service';
import { MaterialModule } from '../../material/material.module';
import { of } from 'rxjs';
import { FormGroup } from '@angular/forms';

@Component({selector: 'app-form', template: ''})
class FormStubComponent {}

let comp:    FormComponent;
let fixture: ComponentFixture<FormComponent>;

describe('CardComponent & TestModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        FormComponent,
        FormStubComponent
      ],
      imports : [MaterialModule, FormsModule, ReactiveFormsModule, HttpClientModule  ],
      providers:[FormControlService],
      schemas: [ NO_ERRORS_SCHEMA ]
     
    })
    .compileComponents().then(() => {
      fixture = TestBed.createComponent(FormComponent);
      comp    = fixture.componentInstance;
    });
  }));

  it('can instantiate the component', () => {
    expect(comp).not.toBeNull();
  });

  it('should create the app', async(() => {
    expect(comp).toBeTruthy();
  }));

  it('should contain "Submit and Cancel"', () => {
  const cardElement: HTMLElement = fixture.nativeElement;
  expect(cardElement.textContent).toContain('CancleSubmit');
  });

  // it('should find the "Submit and Cancel" with fixture.debugElement.nativeElement)', () => {
  //   const cardrDe: DebugElement = fixture.debugElement;
  //   const cardEl: HTMLElement = cardrDe.nativeElement;
  //   const p = cardEl.querySelector('button');
  //   expect(p.textContent).toEqual('Submit');
  // });

  // it('#onSubmit() should toggle', () => {
    
  //   expect(comp.isOn).toBe(false, 'off at first');
  //   comp.onSubmit();
  //   expect(comp.isOn).toBe(true, 'on after click');
  //   comp.onSubmit();
  //   expect(comp.isOn).toBe(false, 'off after second click');
  //   const comp = new DashboardHeroComponent();
  // const hero: Hero = { id: 42, name: 'Test' };
  // comp.hero = hero;
  // comp.selected.subscribe((selectedHero: Hero) => expect(selectedHero).toBe(hero));
  // comp.click();
  // });
  
});

  
describe('FormComponent', () => {

  let fixture: ComponentFixture<FormComponent>;
  let componentFormService: FormControlService; // the actually injected service
  let formService: FormControlService; // the TestBed injected service
  let el: HTMLElement; // the DOM element with the welcome message
  let getFormeSpy: jasmine.Spy;
  let quoteEl: HTMLElement;
  let testform: string;
  let formServiceStub: Partial<FormControlService>;

  beforeEach(() => {

    testform: FormGroup;

    // Create a fake FormControlService object with a `toFormGroup()` spy
    const formService = jasmine.createSpyObj('FormControlService', ['toFormGroup']);
    // Make the spy return a synchronous Observable with the test data
    getFormeSpy = formService.toFormGroup.and.returnValue( of(testform) );

    TestBed.configureTestingModule({
       declarations: [ FormComponent ],
       providers:    [ {provide: FormControlService, useValue: formServiceStub } ]
    });

    fixture = TestBed.createComponent(FormComponent);
    comp    = fixture.componentInstance;
  });

  // it('should show quote after component initialized', () => {
  //   fixture.detectChanges(); // onInit()
  
  //   expect(getQuoteSpy.calls.any()).toBe(true, 'toFormGroup called');
  // });

  
});
