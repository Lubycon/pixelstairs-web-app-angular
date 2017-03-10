import { HeaderController } from './header/header.controller';

import { ArtCardDirective } from './cards/artCard/artCard.directive';

angular
    .module('app.components', [

    ])
    .controller('HeaderController', HeaderController)

    .directive('artCard', ArtCardDirective)
    ;
