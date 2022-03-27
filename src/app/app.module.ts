import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { env } from '../environments/environment';
import { MenuComponent } from './menu/menu.component';
import { CategoryComponent } from './category/category.component';
import { HttpClientModule } from '@angular/common/http';


import {MatTableModule} from '@angular/material/table';
import { ReactiveFormsModule } from '@angular/forms';


import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AddCategoryComponent } from './category/add-category/add-category.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    CategoryComponent,
    AddCategoryComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    MatTableModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: env.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
