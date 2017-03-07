
import { UserAgentDetection } from './ua.constant.js';

angular
    .module('constants', [

    ])
    .constant('APP_VERSION', '1.0.1')

    .constant('USER_AGENT', UserAgentDetection())

    .constant('API_CONFIG', {
        'host': 'http://api.lubycon.com/v1',
        'appkey': 'lubycon-back'
    })

    .constant('APP_LANGUAGES', [{
        name: 'LANGUAGES.ENGLISH',
        key: 'en-US'
    },{
        name: 'LANGUAGES.KOREAN',
        key: 'ko-KR'
    }])

    .constant('CONSOLE_LOG', true)

    .constant('SNS_KEYS', {

    })

    .constant()
    ;
