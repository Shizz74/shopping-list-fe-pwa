import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './category/category.component';
import { AddCategoryComponent } from './category/add-category/add-category.component';
import { EditCategoryComponent } from './category/edit-category/edit-category.component';
import { ProductComponent } from './product/product.component';
import { AddProductComponent } from './product/add-product/add-product.component'
import { EditProductComponent } from './product/edit-product/edit-product.component';
import { ListsComponent } from './lists/lists.component';
import { AddListComponent } from './lists/add-list/add-list/add-list.component';
import { EditListComponent } from './lists/edit-list/edit-list/edit-list.component';

const routes: Routes = [
  { path: '', redirectTo: '/listy', pathMatch: 'full'},
  // { path: '**', component: PageNotFoundComponent },
  { path: 'listy', component: ListsComponent },
  { path: 'nowa-lista', component: AddListComponent },
  { path: 'lista-edycja/:id', component: EditListComponent },
  { path: 'kategorie', component: CategoryComponent },
  { path: 'nowa-kategoria', component: AddCategoryComponent },
  { path: 'kategoria-edycja/:id', component: EditCategoryComponent},
  { path: 'produkty', component: ProductComponent },
  { path: 'nowy-produkt', component: AddProductComponent },
  { path: 'produkt-edycja/:id', component: EditProductComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
