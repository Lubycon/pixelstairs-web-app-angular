import { routeConfig } from './cert.route';

import { CertSignupLandingController } from './cert-signup-landing.controller';
import { CertPasswordController } from './cert-password.controller';
import { CertPasswordLandingController } from './cert-password-landing.controller';

angular
    .module('app.pages.cert', [

    ])
    .config(routeConfig)
    .controller('CertSignupLandingController', CertSignupLandingController)
    .controller('CertPasswordController', CertPasswordController)
    .controller('CertPasswordLandingController', CertPasswordLandingController)
    ;
