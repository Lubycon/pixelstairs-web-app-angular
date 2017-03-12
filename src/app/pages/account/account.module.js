import { routerConfig } from './account.route';
import { SignInController } from './signin.controller';

angular
    .module('app.pages.account', [

    ])
    .config(routerConfig)
    .controller('SignInController', SignInController)
    ;
