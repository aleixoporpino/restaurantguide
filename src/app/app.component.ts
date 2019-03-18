import {Component} from '@angular/core';

import {Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {HomePage} from './home/home.page';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html'
})
export class AppComponent {
    rootPage: any;
    public appMenu = [
        {title: 'Test1', url: '/test1', icon: 'list'},
        {title: 'Test2', url: '/test2', icon: 'add'},
        {title: 'Test3', url: '/test3', icon: 'trash'}
    ];

    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar
    ) {
        this.rootPage = HomePage;
        this.initializeApp();
    }

    initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.splashScreen.hide();
        });
    }
}
