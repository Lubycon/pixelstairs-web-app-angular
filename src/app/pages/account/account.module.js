import { routerConfig } from './account.route';

import { SignInController } from './signin.controller';
import { SignUpController } from './signup.controller';
import { FindPasswordEmailController } from './find-password-email.controller';

angular
    .module('app.pages.account', [

    ])
    .config(routerConfig)

    .controller('SignInController', SignInController)
    .controller('SignUpController', SignUpController)
    .controller('FindPasswordEmailController', FindPasswordEmailController)
    ;
