import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodayComponent } from './today/today.component';
import { NextDaysComponent } from './next-days/next-days.component';

const routes: Routes = [
  {
    path: '', component: TodayComponent
  },
  {
    path: 'four-days', component:NextDaysComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
