import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import PlotsComponent from './plots/plots/plots.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'farms'},
  {
    path: 'farms',
    loadChildren: () => import ('./farms/farms.module').then(m => m.FarmsModule)
  },
  {
    path: 'farms/:id/plots',
    loadChildren: () => import ('./plots/plots.module').then(m => m.PlotsModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
