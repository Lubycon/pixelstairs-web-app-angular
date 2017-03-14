export class CropperModalController {
    constructor(
        $scope, $uibModalInstance, $log,
        data
    ) {
        'ngInject';

        this.$scope = $scope;
        this.$uibModalInstance = $uibModalInstance;
        this.$log = $log;
        this.data = data;

        this.output = null;
    }

    crop() {
        const CANVAS = angular.element('.cropper').cropper('getCroppedCanvas');
        const BASE64 = CANVAS.toDataURL('image/png');

        this.output = BASE64;

        this.$uibModalInstance.close({
            cropped: BASE64
        });
    }

    cancel() {
        this.$uibModalInstance.dismiss('cancel');
    }
}
