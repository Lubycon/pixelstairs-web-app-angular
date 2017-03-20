import { routeConfig } from './contents.route';

import { ContentsUploadController } from './contents-upload.controller';

angular
    .module('app.pages.contents', [

    ])
    .config(routeConfig)
    
    .controller('ContentsUploadController', ContentsUploadController)
    ;
