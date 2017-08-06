import { routerConfig } from './account.route';

import { SigninController } from './signin.controller';
import { SignupController } from './signup.controller';
import { AuthSignupController } from './auth-signup.controller';
import { SigndropController } from './signdrop.controller';

import { FindPasswordEmailController } from './find-password-email.controller';
import { ResetPasswordController } from './reset-password.controller';

angular
    .module('app.pages.account', [

    ])
    .config(routerConfig)

    .controller('SigninController', SigninController)
    .controller('SignupController', SignupController)
    .controller('AuthSignupController', AuthSignupController)
    .controller('SigndropController', SigndropController)
    .controller('FindPasswordEmailController', FindPasswordEmailController)
    .controller('ResetPasswordController', ResetPasswordController)
    ;
