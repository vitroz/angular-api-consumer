import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ContatoService } from './contato.service';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { ConfirmEqualValidatorDirective } from './shared/confirm-equal-validator';
import {NgxMaskModule} from 'ngx-mask';
import { HttpModule } from '@angular/http';
import { PostComponentComponent } from './post-component/post-component.component';
import { PostComponentService } from './post-component/post-component.service';
import { ApiService } from './apiservice.service';

@NgModule({
  declarations: [
    AppComponent,
    ContactFormComponent,
    ConfirmEqualValidatorDirective,
    PostComponentComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    NgxMaskModule.forRoot(),
    HttpModule
  ],
  providers: [ PostComponentService, ApiService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
