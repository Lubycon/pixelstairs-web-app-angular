
import { UserAgentDetection } from './ua.constant.js';
import { APIDetection } from './api.constant.js';

angular
    .module('app.constants', [

    ])
    .constant('APP_VERSION', '1.0.0')

    .constant('CUSTOM_HEADER_PREFIX', 'X-lubycon-')

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

    .constant()
    ;
