import { VideogularComponent } from './components/pages/videogular/videogular.component';
import { HomeComponent } from './components/pages/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VimeComponent } from './components/pages/vime/vime.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'vime', component: VimeComponent },
  { path: 'videogular', component: VideogularComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
