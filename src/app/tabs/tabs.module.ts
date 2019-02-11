import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {TabsRoutingModule} from './tabs-routing.module';
import {TabsComponent} from './tabs.component';
import {HomePageModule} from '../home/home.module';
import {IonicModule} from '@ionic/angular';
import {AboutPageModule} from '../about/about.module';
import {RestaurantListPageModule} from '../restaurant-list/restaurant-list.module';
import {RestaurantFavListPageModule} from '../restaurant-fav-list/restaurant-fav-list.module';

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        TabsRoutingModule,
        HomePageModule,
        AboutPageModule,
        RestaurantListPageModule,
        RestaurantFavListPageModule
    ],
    declarations: [TabsComponent],
})
export class TabsModule {
}
