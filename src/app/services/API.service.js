/* @API CONSTANT */
const API_LIST = {
    members: () => {
        const prefix = 'members';
        return {
            signin: prefix + '/signin',
            signout: prefix + '/signout',
            signup: prefix + '/signup',
            signdrop: prefix + '/signdrop',

            simple: prefix + '/simple',
            detail: prefix + '/detail/{id}',

            pwd: {
                mail: prefix + '/pwd/mail',
                reset: prefix + '/pwd/reset'
            }
        };
    },
    contents: 'contents/{category}'
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
            post: (data) => this.__post__(api, id, data),
            put: (data) => this.__put__(api, id, data),
            delete: () => this.__delete__(api, id)
        };
    }


    /* @PRIVATE METHOD */
    __get__(api, id, params) {
        api = this.__getURI__(api, id);
        return this.Restangular.all(api).customGET('', params);
    }

    __post__(api, id, data) {
        api = this.__getURI__(api, id);
        this.$log.debug(api);
        return this.Restangular.all(api).customPOST(data, undefined, undefined, {
            'Content-Type': 'application/json'
        });
    }

    __put__(api, id, data) {
        api = this.__getURI__(api, id);
        return this.Restangular.all(api).customPUT(data, undefined, undefined, {
            'Content-Type': 'application/json'
        });
    }

    __delete__(api, id) {
        api = this.__getURI__(api, id);
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

        return tmp;
    }

    __setParamsToAPI__(uri, uriParams) {
        const regx = /\{.+\}/gi;
        const braket_regx = /[\{|\}]/g;

        let params = uri.match(regx);
        if(!params) {
            return uri;
        }

        params = params.map(v => {
            return v.replace(braket_regx, '');
        });

        uri = uri.split('/').map(v => {
            return v.replace(braket_regx, '');
        });

        params.forEach(v => {
            let position = uri.indexOf(v);
            if(position > -1) uri[position] = uriParams[v];
        });

        return uri.join('/');
    }
}
