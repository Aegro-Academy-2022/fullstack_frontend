import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AppMaterialModule } from "../shared/app-material/app-material.module";
import { SharedModule } from "../shared/shared.module";
import { ProductionsRoutingModule } from "./productions-routing.module";
import { ProductionsComponent } from './productions/productions.component';
import { ProductionFormComponent } from './production-form/production-form.component';


@NgModule({
    declarations: [     
    ProductionsComponent, ProductionFormComponent
  ],
    imports: [
      CommonModule,
      ProductionsRoutingModule,
      AppMaterialModule,
      SharedModule
    ]
  })
  export class ProductionsModule { }