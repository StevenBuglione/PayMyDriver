import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { CheckOutComponent } from './check-out/check-out.component';

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'checkout', component: CheckOutComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
