import { UserAgentDetection } from './ua.constant';
import { CONTENTS_VIEW_MODE, CONTENTS_SORT_FILTER } from './ui.constant';
import { FORM_CONSTANT } from './form.constant';
import { API_LIST } from './api.constant';

angular
    .module('app.constants', [

    ])

    .constant('CUSTOM_HEADER_PREFIX', 'X-pixel-')

    .constant('USER_AGENT', UserAgentDetection())

    .constant('APP_LANGUAGES', [{
        name: 'LANGUAGES.ENGLISH',
        key: 'en-US'
    },{
        name: 'LANGUAGES.KOREAN',
        key: 'ko-KR'
    }])

    .constant('SNS_KEYS', {})

    .constant('API_LIST', API_LIST)
    .constant('MAIN_GRID_INIT', 'grid')
    .constant('CONTENTS_VIEW_MODE', CONTENTS_VIEW_MODE)
    .constant('CONTENTS_SORT_FILTER', CONTENTS_SORT_FILTER)

    .constant('USER_DEFAULT_PROFILE_IMG', 'https://s3.ap-northeast-2.amazonaws.com/pixelstairs/user/default_profile_image.png')
    .constant('IP_API', 'https://freegeoip.net/json/')

    .constant('FORM_CONSTANT', FORM_CONSTANT)
    ;
