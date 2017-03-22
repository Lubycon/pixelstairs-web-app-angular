export function StickyDirective() {
    'ngInject';

    let directive = {
        restrict: 'A',
        scope: {
            ngModel: '='
        },
        link: link,
        controller: StickyController,
        controllerAs: 'Sticky',
        bindToController: true
    };

    return directive;

    function link($scope, $element, $attr) {
        $scope.$watchCollection('Sticky.ngModel.sticky', (newVal) => {
            console.log(newVal);
            if(newVal) console.log(newVal);
        });
    }
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
        angular.element(this.$window).on('scroll', () => {
            let scrollTop = angular.element(this.$window).scrollTop(),
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
