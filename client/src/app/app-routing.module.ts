import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { DetailModalComponent } from './detail-modal/detail-modal.component';
import { SearchComponent } from './search/search.component';
import { SettingsComponent } from './settings/settings.component';

const routes: Routes = [{
  path: '',component:AppComponent
},
{ path:'search',component: SearchComponent},
{ path:'detail',component: DetailModalComponent},
{path:'settings',component: SettingsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
