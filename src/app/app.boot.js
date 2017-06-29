/*
    @name: app.boot.js
    @desc: these methods are external async data for angaulr app init
           it will be excuted before angular.bootstrap
    @author: Evan Moon
    @contact: bboydart91@gmail.com
    @created_at: 2017-06-13
*/

export default {
    geo_location: () => {
        let defer = $.Deferred();

        $.ajax({
            url: 'https://freegeoip.net/json/',
            dataType: 'json',
            type: 'GET'
        }).then(res => {
            defer.resolve(res);
        }, err => {
            defer.reject();
        });

        return defer;
    }
};
