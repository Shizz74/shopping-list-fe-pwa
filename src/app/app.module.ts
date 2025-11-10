import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { env } from '../environments/environment';
import { HttpClientModule } from '@angular/common/http';

// Material imports
import { MatTableModule } from '@angular/material/table';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatRadioModule } from '@angular/material/radio';

// Componets imports
import { MenuComponent } from './menu/menu.component';
import { CategoryComponent } from './category/category.component';
import { AddCategoryComponent } from './category/add-category/add-category.component';
import { EditCategoryComponent } from './category/edit-category/edit-category.component';
import { ProductComponent } from './product/product.component';
import { AddProductComponent } from './product/add-product/add-product.component';
import { EditProductComponent } from './product/edit-product/edit-product.component';
import { ListsComponent } from './lists/lists.component';
import { AddListComponent } from './lists/add-list/add-list/add-list.component';
import { EditListComponent } from './lists/edit-list/edit-list/edit-list.component';
import { SearchfilterPipe } from './shared/pipe/searchfilter.pipe';

// Third part imports
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxSpinnerModule } from 'ngx-spinner';
import { UnitShortPipe } from './shared/pipe/unit-short.pipe';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    CategoryComponent,
    AddCategoryComponent,
    EditCategoryComponent,
    ProductComponent,
    AddProductComponent,
    EditProductComponent,
    ListsComponent,
    AddListComponent,
    EditListComponent,
    SearchfilterPipe,
    UnitShortPipe,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    MatTableModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    FormsModule,
    Ng2SearchPipeModule,
    MatInputModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    MatRadioModule,
    NgxSpinnerModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: env.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000',
    }),
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
