/* @API CONSTANT */
const API_LIST = {
    members: () => {
        const prefix = 'members';
        return {
            signin: prefix + '/signin',
            signout: prefix + '/signout',
            signup: prefix + '/signup',
            signdrop: prefix + '/signdrop',

            simple: prefix + '/simple/{id}',
            detail: prefix + '/detail/{id}',

            pwd: {
                mail: prefix + '/pwd/mail',
                reset: prefix + '/pwd/reset'
            }
        };
    },
    creators: 'creator'
};
/* @API CONSTANT */


export class APIService {
    constructor(
        Restangular, $log
    ) {
        'ngInject';

        this.Restangular = Restangular;
        this.$log = $log;
        this.API = this.__generateAPI__();
    }

    resource(api, id) {
        return {
            get: (params) => this.__get__(api, id, params),
            post: () => this.__post__(api, params),
            put: () => this.__put__(api, params),
            delete: () => this.__delete__(api)
        };
    }


    /* @PRIVATE METHOD */
    __get__(api, id, params) {
        api = this.__getURI__(api, id);
        return this.Restangular.all(api).customGET('', params);
    }

    __post__(api, data) {
        return this.Restangular.all(api).customPOST(data, undefined, undefined, {
            'Content-Type': 'application/json'
        });
    }

    __put__(api, data) {
        return this.Restangular.all(api).customPUT(data, undefined, undefined, {
            'Content-Type': 'application/json'
        });
    }

    __delete__(api, params) {
        return this.Restangular.all(api).customDELETE();
    }

    __getURI__(api, id, uri, list = this.API, index = 0) {
        let tmp = api.split('.');
        uri = uri;

        if(list[tmp[index]]) {
            if(typeof list[tmp[index]] === 'string') {
                uri = list[tmp[index]];
                return this.__setParamsToAPI__(uri, id);
            }
            else if(typeof list[tmp[index]] === 'object') {
                return this.__getURI__(api, id, tmp[index], list[tmp[index]], index+1);
            }
        }
        else {
            return uri;
        }
    }

    __generateAPI__() {
        let tmp = {};

        Object.keys(API_LIST).forEach((v) => {
            if(typeof API_LIST[v] === 'function') {
                tmp[v] = API_LIST[v]();
            }
            else tmp[v] = API_LIST[v];
        });
        console.log(tmp);
        return tmp;
    }

    __setParamsToAPI__(uri, id) {
        const regx = /\{.+\}/gi;
        const braket_regx = /[\{|\}]/g;

        let params = uri.match(regx);
        if(!params) {
            return uri;
        }

        params.forEach(v => {
            v.replace(braket_regx, '');
        });

        uri = uri.split('/').map(v => {
            return v.replace(braket_regx, '');
        });

        params.forEach(v => {
            let position = uri.indexOf(v);

            if(position > -1) uri[position] = id[v];
        });

        return uri.join('/');
    }
}
