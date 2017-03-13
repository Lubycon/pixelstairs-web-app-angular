import { HeaderController } from './header/header.controller';

import { ArtCardDirective } from './cards/artCard/artCard.directive';
import { DatepickerDirective } from './datepicker/datepicker.directive';

angular
    .module('app.components', [

    ])
    .controller('HeaderController', HeaderController)

    .directive('artCard', ArtCardDirective)
    .directive('datepicker', DatepickerDirective)
    ;
