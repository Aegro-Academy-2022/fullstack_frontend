import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FarmFormComponent } from './farm-form/farm-form.component';
import { FarmsComponent } from './farms/farms.component';

const routes: Routes = [
  {path: '', component: FarmsComponent},
  {path: 'new', component: FarmFormComponent}
 ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FarmsRoutingModule { }
