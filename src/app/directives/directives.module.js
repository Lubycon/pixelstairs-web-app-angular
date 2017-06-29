import { CropperDirective } from './cropper/cropper.directive';
import { ScrollSelectorDirective } from './scrollSelector/scrollSelector.directive';

angular
    .module('app.directives', [

    ])
    .directive('cropper', CropperDirective)
    .directive('scrollSelector', ScrollSelectorDirective)
    ;
