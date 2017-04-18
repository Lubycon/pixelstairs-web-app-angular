
import { UserAgentDetection } from './ua.constant.js';
import { APIDetection } from './api.constant.js';

angular
    .module('app.constants', [

    ])
    .constant('APP_VERSION', '1.0.1')

    .constant('CUSTOM_HEADER_PREFIX', 'X-pixel-')

    .constant('USER_AGENT', UserAgentDetection())

    .constant('API_CONFIG', APIDetection())

    .constant('APP_LANGUAGES', [{
        name: 'LANGUAGES.ENGLISH',
        key: 'en-US'
    },{
        name: 'LANGUAGES.KOREAN',
        key: 'ko-KR'
    }])

    .constant('SNS_KEYS', {

    })

    .constant('MAIN_GRID_INIT', 'grid')
    ;
