import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DarkBinComponent } from './dark-bin.component';

const routes: Routes = [{ path: '', component: DarkBinComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DarkBinRoutingModule { }
