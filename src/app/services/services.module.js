import { UTF8Service } from './UTF8.service';
import { Base64Service } from './Base64.service';
import { CookieService } from './Cookie.service';
import { CreativeCommonsService } from './CreativeCommons.service';
import { AppSettingService } from './AppSetting.service';
import { HistoryService } from './History.service';
import { UUIDService } from './UUID.service';
import { TrackerService } from './Tracker.service';
import { AuthenticationService } from './Authentication.service';
import { APIService } from './API.service';
import { ImageService } from './Image.service';
import { PermissionService } from './Permission.service';
import { FormRegxService } from './FormRegx.service';
import { ErrorCatcherService } from './ErrorCatcher.service';
import { SearchService } from './Search.service';

import { DummyService } from './Dummy.service';

angular
    .module('app.services', [

    ])

    .service('UTF8Service', UTF8Service)

    .service('Base64Service', Base64Service)

    .service('CookieService', CookieService)

    .service('CreativeCommonsService', CreativeCommonsService)

    .service('AppSettingService', AppSettingService)

    .service('HistoryService', HistoryService)

    .service('UUIDService', UUIDService)

    .service('TrackerService', TrackerService)

    .service('AuthenticationService', AuthenticationService)

    .service('APIService', APIService)

    .service('ImageService', ImageService)

    .service('PermissionService', PermissionService)

    .service('FormRegxService', FormRegxService)

    .service('SearchService', SearchService)

    .service('ErrorCatcherService', ErrorCatcherService)
    .factory('$exceptionHandler', function errorHandler(ErrorCatcherService) {
        return function error(exception, cause) {
            ErrorCatcherService.catcher(exception, cause);
        };
    })

    .service('DummyService', DummyService)
    ;
