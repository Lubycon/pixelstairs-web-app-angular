
export function APIDetection() {
    'ngInject';

    const ORIGIN = location.origin;

    const PRO_WEB_SERVER = 'www.lubycon.com';
    const DEV_WEB_SERVER = 'dev.lubycon.com';
    const LOCAL_WEB_SERVER = 'localhost';

    const PRO_API_SERVER = 'http://api.lubycon.com';
    const DEV_API_SERVER = 'http://api.lubycon.com';

    const DEV_APPKEY = 'lubycon-back';

    let api = null;
    let output = {};

    if(ORIGIN.indexOf(PRO_WEB_SERVER) > -1) api = PRO_API_SERVER;
    else if(ORIGIN.indexOf(DEV_WEB_SERVER) > -1) api = DEV_API_SERVER;
    else if(ORIGIN.indexOf(LOCAL_WEB_SERVER) > -1) api = DEV_API_SERVER;
    else api = null;

    output.host = api;
    if(api === DEV_API_SERVER) output.appKey = DEV_APPKEY;

    return output;
}
