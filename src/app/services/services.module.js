import '../constants/constants.module';

import { UTF8Service } from './UTF8.service';
import { Base64Service } from './Base64.service';
import { CookieService } from './Cookie.service';
import { AppSettingService } from './AppSetting.service';


angular
    .module('services', [
        'constants'
    ])

    .service('UTF8Service', UTF8Service)

    .service('Base64Service', Base64Service)

    .service('CookieService', CookieService)

    .service('AppSettingService', AppSettingService)
    ;
