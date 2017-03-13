export function DatepickerDirective() {
    'ngInject';

    let directive = {
        restrict: 'EA',
        templateUrl: 'app/components/datepicker/datepicker.tmpl.html',
        scope: {
            ngModel: '=',
            placeholder: '@'
        },
        link: link,
        controller: DatepickerController,
        controllerAs: 'Datepicker',
        bindToController: true
    };

    return directive;

    function link($scope, $el, $attr, Datepicker) {
        Datepicker.$el = $el;
    }
}



class DatepickerController {
    constructor(
        $rootScope, $log
    ) {
        'ngInject';

        this.$rootScope = $rootScope;
        this.$log = $log;

        this.isMobile = this.$rootScope.deviceInfo.isMobile;
        this.isOpen = false;
    }

    popupOpen() {
        if(!this.isMobile) this.isOpen = true;
        else this.__openMobileDatePicker__();
    }

    /*@PRIVATE METHOD*/
    __openMobileDatePicker__() {
        this.$log.debug('MOBILE COMPONENT IS FOCUSED');
        const ELEMENT = this.$el.find('.mobile-datepicker');
        ELEMENT.triggerHandler('click');
    }
}
