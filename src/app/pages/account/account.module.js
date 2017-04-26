import { routerConfig } from './account.route';

import { SignInController } from './signin.controller';
import { SignUpController } from './signup.controller';

angular
    .module('app.pages.account', [

    ])
    .config(routerConfig)

    .controller('SignInController', SignInController)
    .controller('SignUpController', SignUpController)
    ;
