import { routeConfig } from './cert.route';

import { CertSignupLandingController } from './cert-signup-landing.controller';
import { CertPasswordLandingController } from './cert-password-landing.controller';

angular
    .module('app.pages.cert', [

    ])
    .config(routeConfig)
    .controller('CertSignupLandingController', CertSignupLandingController)
    .controller('CertPasswordLandingController', CertPasswordLandingController)
    ;
