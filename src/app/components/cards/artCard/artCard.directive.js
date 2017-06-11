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
        $rootScope, $scope, $element, $log, $window,
        $timeout, $uibPosition,
        CookieService, ImageService
    ) {
        'ngInject';

        this.$scope = $scope;
        this.$element = $element;
        this.$log = $log;
        this.$window = $window;
        this.$timeout = $timeout;
        this.$uibPosition = $uibPosition;

        this.CookieService = CookieService;
        this.ImageService = ImageService;

        this.isMobile = $rootScope.deviceInfo.isMobile;

        this.position = this.$uibPosition.offset(this.$element);

        (this.init)();
    }

    init() {
        this.data.user.profileImg = angular.extend({}, this.data.user.profileImg, {
            file: this.ImageService.getUserProfile(this.data.user.profileImg)
        });

        this.data.image.file = this.ImageService.setResolution(this.data.image, '1920');
    }
}
