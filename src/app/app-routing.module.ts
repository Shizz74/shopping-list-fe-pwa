import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './category/category.component';
import { AddCategoryComponent } from './category/add-category/add-category.component';
import { EditCategoryComponent } from './category/edit-category/edit-category.component';
import { ProductComponent } from './product/product.component';
import { AddProductComponent } from './product/add-product/add-product.component'

const routes: Routes = [
  { path: '', redirectTo: '/produkty', pathMatch: 'full'},
  // { path: '**', component: PageNotFoundComponent },
  { path: 'kategorie', component: CategoryComponent },
  { path: 'nowa-kategoria', component: AddCategoryComponent },
  { path: 'kategoria-edycja/:id', component: EditCategoryComponent},
  { path: 'produkty', component: ProductComponent },
  { path: 'nowy-produkt', component: AddProductComponent },
  // { path: 'produkt-edycja/:id', component: EditCategoryComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
