import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { RestaurantFavListPage } from './restaurant-fav-list.page';

const routes: Routes = [
  {
    path: '',
    component: RestaurantFavListPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [RestaurantFavListPage]
})
export class RestaurantFavListPageModule {}
