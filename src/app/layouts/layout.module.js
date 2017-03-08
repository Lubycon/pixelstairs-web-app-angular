import { routerConfig } from './layout.route';

import { DefaultLayoutController } from './default/default.layout.controller';

angular
    .module('app.layouts', [

    ])
    .config(routerConfig)
    .controller('DefaultLayoutController', DefaultLayoutController)
    ;
