import '../constants/constants.module';

import { HTTPInterceptorService } from './HTTPInterceptor.service';
import { UTF8Service } from './UTF8.service';
import { Base64Service } from './Base64.service';
import { CookieService } from './Cookie.service';
import { AppSettingService } from './AppSetting.service';
import { HistoryService } from './History.service';
import { UUIDService } from './UUID.service';
import { TrackerService } from './Tracker.service';


angular
    .module('services', [
        'constants'
    ])

    .service('HTTPInterceptorService', HTTPInterceptorService)

    .service('UTF8Service', UTF8Service)

    .service('Base64Service', Base64Service)

    .service('CookieService', CookieService)

    .service('AppSettingService', AppSettingService)

    .service('HistoryService', HistoryService)

    .service('UUIDService', UUIDService)

    .service('TrackerService', TrackerService)
    ;
