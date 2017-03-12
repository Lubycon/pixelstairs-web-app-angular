import { routerConfig } from './layout.route';

import { DefaultLayoutController } from './default/default.layout.controller';
import { FullLayoutController } from './full/full.layout.controller';

angular
    .module('app.layouts', [

    ])
    .config(routerConfig)

    .controller('DefaultLayoutController', DefaultLayoutController)
    .controller('FullLayoutController', FullLayoutController)
    ;
