import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {RestaurantListPage} from './restaurant-list.page';
import {RestaurantModule} from '../restaurant/restaurant.module';

const routes: Routes = [
    {
        path: '',
        component: RestaurantListPage
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
    declarations: [RestaurantListPage]
})
export class RestaurantListPageModule {
}
