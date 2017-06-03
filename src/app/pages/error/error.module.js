import { routeConfig } from './error.route';
import { ErrorPageController } from './errorpage.controller';

angular
    .module('app.pages.error', [

    ])
    .config(routeConfig)
    .controller('ErrorPageController' ,ErrorPageController)
    ;
