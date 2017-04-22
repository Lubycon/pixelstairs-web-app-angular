export function ScrollSelectorDirective() {
    'ngInject';

    let directive = {
        restrict: 'A',
        scope: {
            offset: '=?',
            detectDisabled: '='
        },
        controller: ScrollSelectorController,
        controllerAs: 'ScrollSelector',
        bindToController: true
    };

    return directive;
}

class ScrollSelectorController {
    constructor($scope, $element, $window, $uibPosition) {
        'ngInject';

        this.$scope = $scope;
        this.$element = $element;
        this.$window = $window;
        this.$uibPosition = $uibPosition;

        (this.run)();
    }

    run() {
        let offset = this.offset || 0;

        angular.element(this.$window).on('scroll', () => {
            if(this.detectDisabled) return false;

            let scrollTop = angular.element(this.$window).scrollTop() + offset,
                elementBottomPosition = this.$uibPosition.offset(this.$element).top + this.$element.height();

            const NEW_VAL =
                scrollTop >= this.$uibPosition.offset(this.$element).top &&
                scrollTop < elementBottomPosition;

            if(NEW_VAL) {
                this.$element.addClass('test');
            }
        });
    }
}
