import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ProductionsComponent } from "./productions/productions.component";

const routes: Routes = [
    {path: '', component: ProductionsComponent},
   ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class ProductionsRoutingModule { }