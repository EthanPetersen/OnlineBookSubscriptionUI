import { Routes } from '@angular/router';
import { MainComponent } from './layout/main/main.component';
import { HomeComponent } from './layout/pages/home/home.component';

export const routes: Routes = [
                                    { path: '', redirectTo: '/home', pathMatch: 'full' },
                                    {path:'',component:MainComponent,
                                    children: [{path:"home",component:HomeComponent}]
                              }];
