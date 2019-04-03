import { NgModule }      from '@angular/core';
import {RouterModule} from "@angular/router";
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }  from './app.component';
import { PersonalComponent } from './pages/personal/personal.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CacheService } from './service/cache.service';
import { ApiService } from './service/api.service';

@NgModule({

  imports:      [ 
    CommonModule,
    HttpClientModule,
    BrowserModule ,
    RouterModule.forRoot([
    {path:"*",component:PersonalComponent},
    {path:"src/*",component:PersonalComponent},
    {path:"src",component:PersonalComponent}
  
  ])],
  declarations: [ AppComponent ,PersonalComponent],
  bootstrap:    [ AppComponent ],
  providers:[CacheService,ApiService]
})
export class AppModule { }
