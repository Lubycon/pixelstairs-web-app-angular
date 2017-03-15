export function CropperDirective() {
    'ngInject';

    let directive = {
        restrict: 'A',
        scope: {
            cropping: '='
        },
        link: link,
        controller: CropperController,
        controllerAs: 'Cropper',
        bindToController: true
    };

    return directive;

    function link($scope, $element, $attrs) {
        $.fn.cropper.setDefaults({
            minCanvasWidth: 150,
            minCanvasHeight: 150,
            minContainerWidth: 200,
            minContainerHeight: 200,
            aspectRatio: 1 / 1,
            autoCropArea: 1,
            viewMode: 2,
            center: true,
            responsive: true,
            moveable: true,
            dragMode: "crop"
        });

        $scope.$watch(function() {
            return $element[0].currentSrc;
        }, function(newValue, oldValue) {
            if(oldValue.legnth === 0) {
                $scope.cropping = true;
                $element.cropper();
            }
            else if(newValue !== oldValue) {
                $scope.cropping = true;
                $element.cropper("replace", newValue);
            }
            else return false;
        });
    }
}

class CropperController {
    constructor() {
        'ngInject';

    }
}
