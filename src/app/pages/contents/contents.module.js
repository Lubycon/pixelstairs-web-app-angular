import { routeConfig } from './contents.route';

import { ContentsUploadController } from './contents-upload.controller';
import { ContentsDetailController } from './contents-detail.controller';
import { ContentsUploadSuccessController } from './contents-upload-success.controller';

angular
    .module('app.pages.contents', [

    ])
    .config(routeConfig)

    .controller('ContentsUploadController', ContentsUploadController)
    .controller('ContentsDetailController', ContentsDetailController)
    .controller('ContentsUploadSuccessController', ContentsUploadSuccessController)
    ;
