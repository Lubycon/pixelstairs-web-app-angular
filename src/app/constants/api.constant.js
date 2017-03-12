
export function APIDetection() {
    'ngInject';

    const ORIGIN = location.origin;

    /* ===================== WEB SERVER ==================== */
    const PRO_WEB_SERVER = 'www.pixelstairs.com';
    const DEV_WEB_SERVER = 'dev.pixelstairs.com';
    const LOCAL_WEB_SERVER = 'localhost';
    /* ===================================================== */

    /* ===================== API SERVER ==================== */
    const PRO_API_SERVER = 'http://api.lubycon.com/v1';
    const DEV_API_SERVER = 'http://api.lubycon.com/v1';
    /* ===================================================== */

    const DEV_APPKEY = 'lubycon-back';

    let api = null;
    let output = {};

    if(ORIGIN.indexOf(PRO_WEB_SERVER) > -1) api = PRO_API_SERVER;
    else if(ORIGIN.indexOf(DEV_WEB_SERVER) > -1) api = DEV_API_SERVER;
    else if(ORIGIN.indexOf(LOCAL_WEB_SERVER) > -1) api = DEV_API_SERVER;
    else api = null;

    output.host = api;
    if(api === DEV_API_SERVER) output.appkey = DEV_APPKEY;

    return output;
}
