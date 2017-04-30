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
            }
        });
    }
}

class ArtCardController {
    constructor(
        $scope, $element, $log, $window,
        $timeout, $uibPosition,
        CookieService, ImageResolutionService
    ) {
        'ngInject';

        this.$scope = $scope;
        this.$element = $element;
        this.$log = $log;
        this.$window = $window;
        this.$timeout = $timeout;
        this.$uibPosition = $uibPosition;

        this.CookieService = CookieService;
        this.ImageResolutionService = ImageResolutionService;

        this.position = this.$uibPosition.offset(this.$element);
        console.log(ImageResolutionService);


        (this.init)();
    }

    init() {
        this.data.image.file = this.ImageResolutionService.setResolution(this.data.image, '1920');
    }
}
