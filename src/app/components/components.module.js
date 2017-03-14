import './modals/modals.module';

import { HeaderController } from './header/header.controller';

import { ArtCardDirective } from './cards/artCard/artCard.directive';
import { DatepickerDirective } from './datepicker/datepicker.directive';

angular
    .module('app.components', [
        'app.components.modals'
    ])
    .controller('HeaderController', HeaderController)

    .directive('artCard', ArtCardDirective)
    .directive('datepicker', DatepickerDirective)
    ;
