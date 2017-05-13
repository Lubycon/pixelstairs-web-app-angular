import './modals/modals.module';

import { HeaderController } from './header/header.controller';
import { FooterController } from './footer/footer.controller';

import { ArtCardDirective } from './cards/artCard/artCard.directive';
import { DatepickerDirective } from './datepicker/datepicker.directive';
import { LoadingIconDirective } from './loading_icon/loading_icon.directive';

angular
    .module('app.components', [
        'app.components.modals'
    ])
    .controller('HeaderController', HeaderController)
    .controller('FooterController', FooterController)

    .directive('artCard', ArtCardDirective)
    .directive('datepicker', DatepickerDirective)
    .directive('loadingIcon', LoadingIconDirective)
    ;
