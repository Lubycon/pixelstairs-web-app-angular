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
        key = _encode(this.Base64Service, key);
        return this.$cookies.getObject(key);
    }

    getString(key) {
        key = _encode(this.Base64Service, key);
        return this.$cookies.get(key);
    }

    getDecrypt(key) {
        key = _encode(this.Base64Service, key);
        let value = _decodeValue(this.$cookies.get(key));

        return value;
    }

    getAll() {
        return this.$cookies.getAll();
    }

    put(key, value, options) {
        key = _encode(this.Base64Service, key);
        return this.$cookies.putObject(key, value, options);
    }

    putString(key, value, options) {
        key = _encode(this.Base64Service, key);
        return this.$cookies.put(key, value, options);
    }

    putEncrypt(key, value, options) {
        key = _encode(this.Base64Service, key);
        value = _encodeValue(this.Base64Service, value);
        return this.$cookies.put(key, value, options);
    }

    remove(key, options) {
        key = _encode(this.Base64Service, key);
        return this.$cookies.remove(key, options);
    }
}

/*@PRIVATE METHOD*/

function _encode(Base64Service ,key) {
    if(!key) return null;

    return Base64Service.encode('lubycon-' + key)
        .split('').reverse().join('');
}

function _encodeValue(Base64Service, value) {
    if(!value) return null;

    value = value.toJSON();

    return Base64Service.encode(value);
}

// function _decode(Base64Service, key) {
//     if(!key) return null;
//
//     return Base64Service.decode(key)
//         .split('').reverse().join('');
// }

function _decodeValue(Base64Service, value) {
    if(!value) return null;

    value = Base64Service.decode(value);
    value = value.fromJSON();

    return value;
}
