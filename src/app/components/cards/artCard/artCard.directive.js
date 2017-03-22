export function ArtCardDirective() {
    'ngInject';

    let directive = {
        restrict: 'EA',
        templateUrl: 'app/components/cards/artCard/artCard.tmpl.html',
        scope: {
            data: '=',
            viewmode: '='
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
            if(newVal) $scope.ArtCard.viewmode = newVal;
        });
    }
}

class ArtCardController {
    constructor(
        $log, CookieService, MAIN_GRID_INIT
    ) {
        'ngInject';

        this.$log = $log;
        this.CookieService = CookieService;
    }
}
