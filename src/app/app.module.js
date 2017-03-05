
import { routerConfig } from './app.route';
import { run } from './app.run';

import './config/config.module';
import './constants/constants.module';
import './pages/pages.module';

angular
    .module('app', [
        'ngAnimate',
        'ngCookies',
        'ngTouch',
        'ngSanitize',
        'ngMessages',
        'ngAria',
        'restangular',
        'ui.router',
        'ui.bootstrap',
        'toastr',

        'config',
        'constants',

        'app.pages'
    ])
    .config(routerConfig)
    .run(run)
    ;
// .service('githubContributor', GithubContributorService)
// .service('webDevTec', WebDevTecService)
// .directive('acmeNavbar', NavbarDirective)
// .directive('acmeMalarkey', MalarkeyDirective);
