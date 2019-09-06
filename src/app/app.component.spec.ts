import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule }  from "@angular/material";
import { HttpClientModule } from '@angular/common/http'; 
import { Component, NO_ERRORS_SCHEMA } from '@angular/core';

// in-app imports 
import { AppComponent } from './app.component';

@Component({selector: 'app-card', template: ''})
class CardStubComponent {}

let comp:    AppComponent;
let fixture: ComponentFixture<AppComponent>;

describe('AppComponent & TestModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        CardStubComponent
        
      ],
      imports : [ MatCardModule, HttpClientModule ],
      schemas: [ NO_ERRORS_SCHEMA ]
     
    })
    .compileComponents().then(() => {
      fixture = TestBed.createComponent(AppComponent);
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