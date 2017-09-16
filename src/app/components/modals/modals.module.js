import { CropperModalController } from './cropper/cropper.modal.controller';
import { SignupModalController } from './signup/signup.modal.controller';

angular
    .module('app.components.modals', [

    ])
    .controller('CropperModalController', CropperModalController)
    .controller('SignupModalController', SignupModalController)
    ;
