import { routeConfig } from './company.route';

import { AboutusController } from './aboutus.controller';

angular
    .module('app.pages.company', [

    ])
    .config(routeConfig)
    .controller('AboutusController', AboutusController)
    ;
