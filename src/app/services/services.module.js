import { UTF8Service } from './UTF8.service';
import { Base64Service } from './Base64.service';
import { CookieService } from './Cookie.service';
import { AppSettingService } from './AppSetting.service';
import { HistoryService } from './History.service';
import { UUIDService } from './UUID.service';
import { TrackerService } from './Tracker.service';
import { AuthenticationService } from './Authentication.service';
import { StateAuthenticationService } from './StateAuthentication.service';
import { APIService } from './API.service';
import { ImageService } from './Image.service';

import { DummyService } from './Dummy.service';


angular
    .module('app.services', [

    ])

    .service('UTF8Service', UTF8Service)

    .service('Base64Service', Base64Service)

    .service('CookieService', CookieService)

    .service('AppSettingService', AppSettingService)

    .service('HistoryService', HistoryService)

    .service('UUIDService', UUIDService)

    .service('TrackerService', TrackerService)

    .service('AuthenticationService', AuthenticationService)

    .service('StateAuthenticationService', StateAuthenticationService)

    .service('APIService', APIService)

    .service('ImageService', ImageService)

    .service('DummyService', DummyService)
    ;
