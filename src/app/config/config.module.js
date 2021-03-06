import '../constants/constants.module';

import { httpConfig } from './http.config';
import { toastrConfig } from './toastr.config';
import { cookieConfig } from './cookie.config';
import { locationConfig } from './location.config';
import { languageConfig } from './language.config';
import { restangularConfig } from './restangular.config';
import { translateConfig } from './translate.config';
import { logConfig } from './log.config';

angular
    .module('app.config', [
        'app.env', 'app.constants'
    ])
    .config(httpConfig)

    .config(toastrConfig)

    .config(cookieConfig)

    .config(locationConfig)

    .config(languageConfig)

    .config(restangularConfig)

    .config(translateConfig)

    .config(logConfig)
    ;
