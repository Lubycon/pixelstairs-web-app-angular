
import { routerConfig } from './app.route';
import { run } from './app.run';

import './config/config.module';
import './constants/constants.module';
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

        'config', // APP CONFIG MODULE
        'constants', // APP CONSTANTS MODULE

        'app.pages' // PAGE MODULE
    ])
    .config(routerConfig)
    .run(run)
    ;
// .service('githubContributor', GithubContributorService)
// .service('webDevTec', WebDevTecService)
// .directive('acmeNavbar', NavbarDirective)
// .directive('acmeMalarkey', MalarkeyDirective);
