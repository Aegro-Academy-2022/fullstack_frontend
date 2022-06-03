import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FarmsComponent } from './farms/farms.component';
import { AppMaterialModule } from '../shared/app-material/app-material.module';
import { FarmsRoutingModule } from './farms-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FarmFormComponent } from './farm-form/farm-form.component';


@NgModule({
  declarations: [
    FarmsComponent,
    FarmFormComponent
  ],
  imports: [
    CommonModule,
    FarmsRoutingModule,
    AppMaterialModule,
    SharedModule
  ]
})
export class FarmsModule { }
