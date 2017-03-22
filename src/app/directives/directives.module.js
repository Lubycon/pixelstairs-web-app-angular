import { CropperDirective } from './cropper/cropper.directive';
import { StickyDirective } from './sticky/sticky.directive.js';

angular
    .module('app.directives', [

    ])
    .directive('cropper', CropperDirective)
    .directive('sticky', StickyDirective)
    ;
