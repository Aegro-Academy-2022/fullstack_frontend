import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AppMaterialModule } from "../shared/app-material/app-material.module";
import { SharedModule } from "../shared/shared.module";
import { ProductionsRoutingModule } from "./productions-routing.module";
import { ProductionsComponent } from './productions/productions.component';


@NgModule({
    declarations: [     
    ProductionsComponent
  ],
    imports: [
      CommonModule,
      ProductionsRoutingModule,
      AppMaterialModule,
      SharedModule
    ]
  })
  export class ProductionsModule { }