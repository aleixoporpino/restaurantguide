import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {TabsComponent} from './tabs.component';
import {HomePage} from '../home/home.page';
import {AboutPage} from '../about/about.page';
import {RestaurantListPage} from '../restaurant-list/restaurant-list.page';
import {RestaurantFavListPage} from '../restaurant-fav-list/restaurant-fav-list.page';

const routes: Routes = [
    {
        path: 'tabs',
        component: TabsComponent,
        children: [
            {
                path: '',
                redirectTo: '/tabs/restaurant-list',
                pathMatch: 'full'
            },
            {
                path: 'restaurant-list',
                children: [
                    {
                        path: '',
                        loadChildren: '../restaurant-list/restaurant-list.module#RestaurantListPageModule'
                    }
                ]
            },
            {
                path: 'restaurant-fav-list',
                children: [
                    {
                        path: '',
                        loadChildren: '../restaurant-fav-list/restaurant-fav-list.module#RestaurantFavListPageModule'
                    }
                ]
            },
            {
                path: 'about',
                children: [
                    {
                        path: '',
                        loadChildren: '../about/about.module#AboutPageModule'
                    }
                ]
            },
        ]
    },
    {
        path: '',
        redirectTo: '/tabs/restaurant-list',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TabsRoutingModule {
}
