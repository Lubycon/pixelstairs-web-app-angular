export class CookieService {
    constructor (
        $cookies, Base64Service
    ) {
        'ngInject';

        this.$cookies = $cookies;
        this.Base64Service = Base64Service;
    }


    get(key) {
        key = this.__encode__(key);
        return this.$cookies.getObject(key);
    }

    getString(key) {
        key = this.__encode__(key);
        return this.$cookies.get(key);
    }

    getDecrypt(key) {
        key = this.__encode__(key);
        let value = _decodeValue(this.$cookies.get(key));

        return value;
    }

    getAll() {
        return this.$cookies.getAll();
    }

    put(key, value, options) {
        key = this.__encode__(key);
        return this.$cookies.putObject(key, value, options);
    }

    putString(key, value, options) {
        key = this.__encode__(key);
        return this.$cookies.put(key, value, options);
    }

    putEncrypt(key, value, options) {
        key = this.__encode__(key);
        value = _encodeValue(this.Base64Service, value);
        return this.$cookies.put(key, value, options);
    }

    remove(key, options) {
        key = this.__encode__(key);
        return this.$cookies.remove(key, options);
    }




    /* @PRIVATE METHOD */
    __encode__(key) {
        if(!key) return null;

        return this.Base64Service.encode('lubycon-' + key)
            .split('').reverse().join('');
    }

    __encodeValue__(value) {
        if(!value) return null;

        value = value.toJSON();

        return this.Base64Service.encode(value);
    }

    __decodeValue__(value) {
        if(!value) return null;

        value = this.Base64Service.decode(value);
        value = value.fromJSON();

        return value;
    }
}
