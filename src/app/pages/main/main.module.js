
import { routerConfig } from './main.route';
import { MainController } from './main.controller';

angular
    .module('app.pages.main', [

    ])
    .config(routerConfig)
    .controller('MainController', MainController)
    ;
