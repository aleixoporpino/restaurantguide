import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {RestaurantDetailsPage} from './restaurant-details.page';
import {RestaurantModule} from '../restaurant/restaurant.module';


const routes: Routes = [
    {
        path: '',
        component: RestaurantDetailsPage
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
    declarations: [RestaurantDetailsPage],
})
export class RestaurantDetailsPageModule {
}
