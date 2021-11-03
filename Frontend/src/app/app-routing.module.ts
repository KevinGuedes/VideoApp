import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VideogularComponent } from './components/pages/videogular/videogular.component';
import { HomeComponent } from './components/pages/home/home.component';
import { VimeComponent } from './components/pages/vime/vime.component';
import { VideoTagComponent } from './components/pages/video-tag/video-tag.component';
import { VideoUploadComponent } from './components/pages/video-upload/video-upload.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'vime', component: VimeComponent },
  { path: 'videogular', component: VideogularComponent },
  { path: 'video-tag', component: VideoTagComponent },
  { path: 'video-upload', component: VideoUploadComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
