import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FarmsComponent } from './farms/farms.component';
import { AppMaterialModule } from '../shared/app-material/app-material.module';
import { FarmsRoutingModule } from './farms-routing.module';


@NgModule({
  declarations: [
    FarmsComponent
  ],
  imports: [
    CommonModule,
    FarmsRoutingModule,
    AppMaterialModule
  ]
})
export class FarmsModule { }
