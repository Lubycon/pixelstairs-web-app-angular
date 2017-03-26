export function ArtCardDirective() {
    'ngInject';

    let directive = {
        restrict: 'EA',
        templateUrl: 'app/components/cards/artCard/artCard.tmpl.html',
        scope: {
            data: '=',
            viewmode: '=',
            fixedHeader: '=',
            headerOffset: '=?'
        },
        link: link,
        controller: ArtCardController,
        controllerAs: 'ArtCard',
        bindToController: true,
        replace: true
    };

    return directive;

    function link($scope) {
        $scope.$watch('ArtCard.viewmode', (newVal) => {
            if(newVal) {
                $scope.ArtCard.viewmode = newVal;
                $scope.ArtCard.init();
            }
        });
    }
}

class ArtCardController {
    constructor(
        $scope, $element, $log, $window,
        $timeout, $uibPosition,
        CookieService
    ) {
        'ngInject';

        this.$scope = $scope;
        this.$element = $element;
        this.$log = $log;
        this.$window = $window;
        this.$timeout = $timeout;
        this.$uibPosition = $uibPosition;

        this.CookieService = CookieService;

        this.position = this.$uibPosition.offset(this.$element);

        (this.init)();
    }

    init() {
        if(this.fixedHeader) {
            angular.element(this.$window).on('scroll', () => {
                this.setFixedHeader();
            });
        }
    }

    setFixedHeader() {
        this.$timeout(() => {
            // let header = this.$element.find('.card-header'),
            //     nextElement = this.$element.find('.card-header').next();
            //
            // let scrollTop = angular.element(this.$window).scrollTop() + this.headerOffset,
            //     top = this.position.top,
            //     bottom = this.position.top + this.$element.height() - (this.headerOffset);
            //
            // let fixedSticky = scrollTop >= top && scrollTop < bottom;
            // let absoluteSticky = scrollTop >= bottom;
            //
            // if(fixedSticky) {
            //     header.removeClass('sticky-header-absolute');
            //     header.addClass('sticky-header');
            //
            //     nextElement.addClass('sticky-bottom');
            //     nextElement.css('padding-top', header.outerHeight());
            // }
            // else if(absoluteSticky) {
            //     header.removeClass('sticky-header');
            //     header.addClass('sticky-header-absolute');
            // }
            // else {
            //     header.removeClass('sticky-header');
            //     nextElement.removeClass('sticky-bottom');
            //     nextElement.css('padding-top', 0);
            // }
        });
    }
}
