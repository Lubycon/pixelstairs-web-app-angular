export function ArtCardDirective() {
    'ngInject';

    let directive = {
        restrict: 'EA',
        templateUrl: 'app/components/cards/artCard/artCard.tmpl.html',
        scope: {
            data: '='
        },
        controller: ArtCardController,
        controllerAs: 'ArtCard',
        bindToController: true
    };

    return directive;
}

class ArtCardController {
    constructor(
        $log, CookieService
    ) {
        'ngInject';

        this.$log = $log;
        this.CookieService = CookieService;

        $log.debug(this.CookieService.get('viewmode'));
    }
}
