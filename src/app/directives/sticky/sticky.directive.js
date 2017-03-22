export function StickyDirective() {
    'ngInject';

    let directive = {
        restrict: 'A',
        scope: {
            ngModel: '=',
            offset: '=?'
        },
        controller: StickyController,
        controllerAs: 'Sticky',
        bindToController: true
    };

    return directive;
}

class StickyController {
    constructor($scope, $element, $window, $uibPosition) {
        'ngInject';

        this.$scope = $scope;
        this.$element = $element;
        this.$window = $window;
        this.$uibPosition = $uibPosition;

        this.ngModel.sticky = false;

        (this.run)();
    }

    run() {
        let offset = this.offset || 0;

        angular.element(this.$window).on('scroll', () => {
            let scrollTop = angular.element(this.$window).scrollTop() + offset,
                elementBottomPosition = this.$uibPosition.offset(this.$element).top + this.$element.height();

            const OLD_VAL = angular.copy(this.ngModel.sticky);
            const NEW_VAL =
                scrollTop >= this.$uibPosition.offset(this.$element).top &&
                scrollTop < elementBottomPosition;

            if(OLD_VAL !== NEW_VAL) {
                this.ngModel.sticky = NEW_VAL;
                this.$scope.$apply();
            }
        });
    }
}
