import { routeConfig } from './cert.route';

import { CertSignupController } from './cert-signup.controller';
import { CertPasswordCodeController } from './cert-password-code.controller';

angular
    .module('app.pages.cert', [

    ])
    .config(routeConfig)
    .controller('CertSignupController', CertSignupController)
    .controller('CertPasswordCodeController', CertPasswordCodeController)
    ;
