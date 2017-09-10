import './modals/modals.module';

import { HeaderController } from './header/header.controller';
import { FooterController } from './footer/footer.controller';

import { MainJumboController } from './jumbotron/main.jumbo.controller';
import { AboutJumboController } from './jumbotron/about.jumbo.controller';

import { ArtCardDirective } from './cards/artCard/artCard.directive';
import { DatepickerDirective } from './datepicker/datepicker.directive';

angular
    .module('app.components', [
        'app.components.modals'
    ])
    .controller('HeaderController', HeaderController)
    .controller('FooterController', FooterController)

    .controller('MainJumboController', MainJumboController)
    .controller('AboutJumboController', AboutJumboController)

    .directive('artCard', ArtCardDirective)
    .directive('datepicker', DatepickerDirective)
    ;
