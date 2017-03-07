export class CookieService {
    constructor (
        $cookies, Base64Service
    ) {
        'ngInject';

        this.$cookies = $cookies;
        this.Base64Service = Base64Service;
    }

    /*@PUBLIC*/
    get(key) {
        key = this._encode(key);
        return this.$cookies.getObject(key);
    }

    getString(key) {
        key = this._encode(key);
        return this.$cookies.get(key);
    }

    getDecrypt(key) {
        key = this._encode(key);
        let value = this._decodeValue(this.$cookies.get(key));

        return value;
    }

    getAll() {
        key = this._encode(key);
        return this.$cookies.getAll();
    }

    put(key, value, options) {
        key = this._encode(key);
        return this.$cookies.putObject(key, value, options);
    }

    putString(key, value, options) {
        key = this._encode(key);
        return this.$cookies.put(key, value, options);
    }

    putEncrypt(key, value, options) {
        key = this._encode(key);
        value = this._encodeValue(value);
        return this.$cookies.put(key, value, options);
    }

    remove(key, options) {
        key = this._encode(key);
        return this.$cookies.remove(key, options);
    }



    /*@PRIVATE*/
    
    _encode(key) {
        if(!key) return null;

        return this.Base64Service.encode('lubycon-' + key)
            .split('').reverse().join('');
    }

    _encodeValue(value) {
        if(!value) return null;

        const type = value.constructor.name;
        value = JSON.stringify(value);

        return this.Base64Service.encode(value);
    }

    _decode(key) {
        if(!key) return null;

        return this.Base64Service.decode(key)
            .split('').reverse().join('');
    }

    _decodeValue(value) {
        if(!value) return null;

        value = Base64Service.decode(value);
        value = JSON.parse(value);

        return value;
    }
}
