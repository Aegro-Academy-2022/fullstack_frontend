import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AppMaterialModule } from "../shared/app-material/app-material.module";
import { SharedModule } from "../shared/shared.module";
import { PlotsRoutingModule } from "./plots-routing.module";
import { PlotsComponent } from "./plots/plots.component";

@NgModule({
    declarations: [
     PlotsComponent
    ],
    imports: [
      CommonModule,
      PlotsRoutingModule,
      AppMaterialModule,
      SharedModule
    ]
  })
  export class PlotsModule { }