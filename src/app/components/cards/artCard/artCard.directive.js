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
        $timeout,
        CookieService
    ) {
        'ngInject';

        this.$scoep = $scope;
        this.$element = $element;
        this.$log = $log;
        this.$window = $window;
        this.$timeout = $timeout;

        this.CookieService = CookieService;

        (this.init)();
    }

    init() {
        if(this.fixedHeader) this.setFixedHeader();
    }

    setFixedHeader() {
        this.$timeout(() => {
            let header = this.$element.find('.card-header');
            header.css({
                'position': 'sticky',
                'top': this.headerOffset || 0,
                'z-index': 1
            });
        });
    }
}
