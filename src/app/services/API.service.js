/*
    @name: API.service.js
    @desc: RESTful API 통신 서비스
    @author: Evan Moon
    @created_at:
*/

export class APIService {
    constructor(
        API_LIST, Restangular, $log, $q
    ) {
        'ngInject';

        this.API_LIST = API_LIST;
        this.Restangular = Restangular;
        this.$log = $log;
        this.$q = $q;
        this.API = this.__generateAPI__(API_LIST);
    }

    resource(api, id) {
        return {
            get: (params) => this.__get__(api, id, params),
            post: (data) => this.__post__(api, id, data),
            put: (data) => this.__put__(api, id, data),
            delete: () => this.__delete__(api, id),
            postForm: (data) => this.__postForm__(api, id, data)
        };
    }


    /* @PRIVATE METHOD */
    __get__(api, id, params) {
        api = this.__getURI__(api, id);
        return this.__validate__(this.Restangular.all(api).customGET('', params));
    }

    __post__(api, id, data) {
        api = this.__getURI__(api, id);
        return this.__validate__(this.Restangular.all(api).customPOST(data, undefined, undefined, {
            'Content-Type': 'application/json'
        }));
    }

    // Multipart/form test
    __postForm__(api, id, data) {
        api = this.__getURI__(api, id);
        return this.__validate__(
            this.Restangular.all(api)
            .withHttpConfig({
                transformRequest: angular.identity
            })
            .customPOST(data, '', undefined, {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
                'X-Requested-With': 'XMLHttpRequest',
                'Accept':'*/*'
            })
        );
    }
    // Multipart/form test

    __put__(api, id, data) {
        api = this.__getURI__(api, id);
        return this.__validate__(this.Restangular.all(api).customPUT(data, undefined, undefined, {
            'Content-Type': 'application/json'
        }));
    }

    __delete__(api, id) {
        api = this.__getURI__(api, id);
        return this.__validate__(this.Restangular.all(api).customDELETE());
    }

    __validate__(response) {
        let defer = this.$q.defer();
        response.then(res => {
            if(res.status.code === '0000') {
                defer.resolve({ result: res.result, status: res.status });
            }
            else {
                defer.reject(res.status);
            }
        }, err => {
            defer.reject(err);
        });

        return defer.promise;
    }

    __getURI__(api, id, uri, list = this.API, index = 0) {
        let tmp = api.split('.');
        uri = uri;

        if(list[tmp[index]]) {
            if(angular.isString(list[tmp[index]])) {
                uri = list[tmp[index]];
                return this.__setParamsToAPI__(uri, id);
            }
            else if(angular.isObject(list[tmp[index]])) {
                return this.__getURI__(api, id, tmp[index], list[tmp[index]], index+1);
            }
        }
        else {
            return uri;
        }
    }

    __generateAPI__(API_LIST) {
        let tmp = {};

        Object.keys(API_LIST).forEach((v) => {
            if(angular.isFunction(API_LIST[v])) {
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
