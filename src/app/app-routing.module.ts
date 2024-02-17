import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodayComponent } from './today/today.component';
import { NextDaysComponent } from './next-days/next-days.component';
import { ErrorComponent } from './error/error.component';

const routes: Routes = [
  {
    path: '', component: TodayComponent
  },
  {
    path: 'four-days', component:NextDaysComponent
  },
  {
    path: 'error', component: ErrorComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
