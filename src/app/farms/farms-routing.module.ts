import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlotsComponent } from '../plots/plots/plots.component';
import { FarmFormComponent } from './farm-form/farm-form.component';
import { FarmsComponent } from './farms/farms.component';

const routes: Routes = [
  {path: '', component: FarmsComponent},
 ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FarmsRoutingModule { }
