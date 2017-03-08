
import { routerConfig } from './app.route';
import { run } from './app.run';

import './config/config.module';
import './constants/constants.module';
import './layouts/layout.module';
import './services/services.module';
import './pages/pages.module';

angular
    .module('app', [
        'ngAnimate', // animate.css MODULE
        'ngCookies', // COOKIE STORE MODULE
        'ngTouch', // TOUCH MODULE FOR MOBILE MOBULE
        'ngSanitize', // STRING TO HTML CONVERTING MODULE
        'ngMessages', // FORM ERROR OR INFO MESSAGE MODULE
        'ngAria', // FORM CONTROL MODULE
        'restangular', // REST API MODULE
        'ui.router', // STATE CONTROL MODULE FOR SPA
        'ui.bootstrap', // BOOTSTRAP MODULE
        'toastr', // TOAST
        'pascalprecht.translate', // TRANSLATE FOR LANGUAGE PACK MODULE
        'ngFileUpload', // FILE UPLOAD MODULE
        'infinite-scroll', // INFINITE SCROLL

        'app.config', // APP CONFIG MODULE
        'app.constants', // APP CONSTANTS MODULE
        'app.layouts', // APP LAYOUT MODULE
        'app.services', // APP SERVICE MODULE

        'app.pages' // PAGE MODULE
    ])
    .config(routerConfig)
    .run(run)
    ;
// .service('githubContributor', GithubContributorService)
// .service('webDevTec', WebDevTecService)
// .directive('acmeNavbar', NavbarDirective)
// .directive('acmeMalarkey', MalarkeyDirective);
