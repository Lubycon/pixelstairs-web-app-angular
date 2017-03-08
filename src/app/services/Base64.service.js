export class Base64Service {
    constructor (
        $rootScope, $log, UTF8Service
    ) {
        'ngInject';

        this.$log = $log;
        this.UTF8Service = UTF8Service;

        this.KEY_STR = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
        this.BASE64_REGX = /[^A-Za-z0-9\+\/\=]/g;
    }


    encode(string) {
        string = this.UTF8Service.encode(string);

        let output = '';
        let char1 = '', char2 = '', char3 = '';
        let enc1 = '', enc2 = '', enc3 = '', enc4 = '';
        let i = 0;

        do {
            char1 = string.charCodeAt(i++);
            char2 = string.charCodeAt(i++);
            char3 = string.charCodeAt(i++);

            enc1 = char1 >> 2;
            enc2 = ((char1 & 3) << 4) | (char2 >> 4);
            enc3 = ((char2 & 15) << 2) | (char3 >> 6);
            enc4 = char3 & 63;

            if(isNaN(char2)) enc3 = enc4 = 64;
            else if(isNaN(char3)) enc4 = 64;

            output = output +
                this.KEY_STR.charAt(enc1) +
                this.KEY_STR.charAt(enc2) +
                this.KEY_STR.charAt(enc3) +
                this.KEY_STR.charAt(enc4);
            char1 = char2 = char3 = '';
            enc1 = enc2 = enc3 = enc4 = '';
        }
        while(i < string.length);

        return output;
    }

    decode(string) {
        let output = '';
        let char1 = '', char2 = '', char3 = '';
        let enc1 = '', enc2 = '', enc3 = '', enc4 = '';
        let i = 0;

        if(this.BASE64_REGX.exec(string)) {
            this.$log.error(
                "There were invalid base64 characters in the input text.\n" +
                "Valid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\n" +
                "Expect errors in decoding."
            );

            return false;
        }

        string = string.replace(this.BASE64_REGX, '');

        do {
            enc1 = this.KEY_STR.indexOf(string.charAt(i++));
            enc2 = this.KEY_STR.indexOf(string.charAt(i++));
            enc3 = this.KEY_STR.indexOf(string.charAt(i++));
            enc4 = this.KEY_STR.indexOf(string.charAt(i++));

            char1 = (enc1 << 2) | (enc2 >> 4);
            char2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            char3 = ((enc3 & 3) << 6) | enc4;

            output += String.fromCharCode(char1);

            if (enc3 !== 64) {
                output +=  String.fromCharCode(char2);
            }
            if (enc4 !== 64) {
                output += String.fromCharCode(char3);
            }

            char1 = char2 = char3 = '';
            enc1 = enc2 = enc3 = enc4 = '';

        }
        while (i < string.length);

        return this.UTF8Service.decode(output);
    }
}
