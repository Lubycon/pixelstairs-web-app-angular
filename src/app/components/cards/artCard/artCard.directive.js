export function ArtCardDirective() {
    'ngInject';

    let directive = {
        restrict: 'EA',
        templateUrl: 'app/components/cards/artCard/artCard.tmpl.html',
        scope: {
            data: '='
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
        this.viewmode = this.isMobile ? 'wide' : 'grid';

        (this.init)();
    }

    init() {
        this.data.user.profileImg = angular.extend({}, this.data.user.profileImg, {
            file: this.ImageService.getUserProfile(this.data.user.profileImg)
        });

        this.__setImage__(this.data.image);
    }

    /* PRIVATE METHODS */
    __setImage__(image) {
        if(image) {
            image.thumbnail = this.ImageService.setResolution(image, '30');
            image.file = this.ImageService.setResolution(image, '640');
        }

        return image;
    }
}
