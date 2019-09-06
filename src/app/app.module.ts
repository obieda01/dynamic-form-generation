import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { ApiService} from './services/api.service';
import { FormControlService} from './services/form-control.service';
import { MaterialModule } from './material/material.module';
import { CardComponent } from './components/card/card.component';
import { FormComponent } from './components/form/form.component';
import { FormQuestionComponent } from './components/form-question/form-question.component';

@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    FormComponent,
    FormQuestionComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule
  ],
  providers: [ApiService, FormControlService],
  bootstrap: [AppComponent]
})
export class AppModule { }


