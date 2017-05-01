import { routeConfig } from './company.route';

import { AboutusController } from './aboutus.controller';
import { DocsController } from './docs.controller';

angular
    .module('app.pages.company', [

    ])
    .config(routeConfig)
    .controller('AboutusController', AboutusController)
    .controller('DocsController', DocsController)
    ;
