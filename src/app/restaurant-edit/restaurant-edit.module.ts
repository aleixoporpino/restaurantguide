import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { RestaurantEditPage } from './restaurant-edit.page';
import {RestaurantModule} from '../restaurant/restaurant.module';

const routes: Routes = [
  {
    path: '',
    component: RestaurantEditPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RestaurantModule,
    RouterModule.forChild(routes)
  ],
  declarations: [RestaurantEditPage]
})
export class RestaurantEditPageModule {}
