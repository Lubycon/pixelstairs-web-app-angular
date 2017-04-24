import { routerConfig } from './account.route';

import { SignInController } from './signin.controller';
import { SignUpController } from './signup.controller';
import { SignOutController } from './signout.controller';

angular
    .module('app.pages.account', [

    ])
    .config(routerConfig)

    .controller('SignInController', SignInController)
    .controller('SignUpController', SignUpController)
    .controller('SignOutController', SignOutController)
    ;
