import '../constants/constants.module';

import { httpConfig } from './http.config';
import { toastrConfig } from './toastr.config';
import { cookieConfig } from './cookie.config';
import { locationConfig } from './location.config';
import { restangularConfig } from './restangular.config';

angular
    .module('config', [
        'constants'
    ])
    .config(httpConfig)

    .config(toastrConfig)

    .config(cookieConfig)

    .config(locationConfig)

    .config(restangularConfig)
    ;
