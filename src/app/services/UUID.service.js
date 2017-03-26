export class UUIDService {
    constructor($window) {
        'ngInject';

        this.$window = $window;
    }

    generate(type) {
        let now = new Date().getMilliseconds();
        const isExistPerformance = this.$window.performance && angular.isFunction(this.$window.performance.now);

        if(isExistPerformance) {
            now += this.$window.performance.now();
        }

        const UUID = type.replace(/[xy]/g, char => {
            let rand = (now + Math.random() * 16) % 16 | 0;
            now = Math.floor(now / 16);
            return (char === 'x' ? rand : (rand & 0x3 | 0x8)).toString(16);
        });

        return UUID;
    }
}
