import '../constants/constants.module';

import { httpConfig } from './http.config';
import { toastrConfig } from './toastr.config';
import { cookieConfig } from './cookie.config';
import { locationConfig } from './location.config';
import { restangularConfig } from './restangular.config';
import { translateConfig } from './translate.config';
import { logConfig } from './log.config';

angular
    .module('config', [
        'constants'
    ])
    .config(httpConfig)

    .config(toastrConfig)

    .config(cookieConfig)

    .config(locationConfig)

    .config(restangularConfig)

    .config(translateConfig)

    .config(logConfig)
    ;
