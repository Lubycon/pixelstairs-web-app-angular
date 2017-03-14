import { CropperDirective } from './cropper/cropper.directive';

angular
    .module('app.directives', [

    ])
    .directive('cropper', CropperDirective)
    ;
