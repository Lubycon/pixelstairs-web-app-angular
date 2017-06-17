export function DatepickerDirective() {
    'ngInject';

    let directive = {
        restrict: 'EA',
        templateUrl: 'app/components/datepicker/datepicker.tmpl.html',
        scope: {
            ngModel: '=',
            placeholder: '@',
            class: '@'
        },
        link: link,
        controller: DatepickerController,
        controllerAs: 'Datepicker',
        bindToController: true,
        replace: true
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
        this.options = {
            initDate: new Date(),
            minDate: new Date('1950-01-01'),
            maxDate: new Date(),
            showWeeks: false
        };
    }

    popupOpen() {
        this.isOpen = true;
    }
}
