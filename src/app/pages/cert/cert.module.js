import { routeConfig } from './cert.route';

import { CertMailController } from './cert-mail.controller';

angular
    .module('app.pages.cert', [

    ])
    .config(routeConfig)
    .controller('CertMailController', CertMailController)
    ;
