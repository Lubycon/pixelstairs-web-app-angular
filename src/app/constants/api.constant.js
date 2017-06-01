
export function APIDetection() {
    'ngInject';

    const ORIGIN = location.origin;

    /* ===================== WEB SERVER ==================== */
    const PRO_WEB_SERVER = 'www.pixelstairs.com';
    const DEV_WEB_SERVER = 'dev.pixelstairs.com';
    const LOCAL_WEB_SERVER = 'localhost';
    /* ===================================================== */

    /* ===================== API SERVER ==================== */
    const PRO_API_SERVER = 'https://apidev.pixelstairs.com/v1';
    const DEV_API_SERVER = 'https://apidev.pixelstairs.com/v1';
    const LOCAL_API_SERVER_DANIEL = 'https://pixel.api/v1';
    const LOCAL_API_SERVER_EVAN = 'https://localserver.dev/v1';
    /* ===================================================== */

    const DEV_APPKEY = 'lubycon-back';

    let api = null;
    let output = {};
    output.isValid = false;
    output.isDev = true;

    /* PROVISION */
    if(ORIGIN.indexOf(PRO_WEB_SERVER) > -1) {
        api = PRO_API_SERVER;
        output.isValid = true;
        output.isDev = false;
    }
    /* DEV */
    else if(ORIGIN.indexOf(DEV_WEB_SERVER) > -1) {
        api = DEV_API_SERVER;
        output.isValid = true;
    }
    /* LOCAL */
    else if(ORIGIN.indexOf(LOCAL_WEB_SERVER) > -1) {
        api = DEV_API_SERVER;
        output.isValid = true;
    }
    else {
        api = null;
        output.isDev = false;
    }

    output.host = api;
    if(api === DEV_API_SERVER) output.appkey = DEV_APPKEY;

    return output;
}
