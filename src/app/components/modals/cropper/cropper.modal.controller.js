export class CropperModalController {
    constructor(
        $scope, $uibModalInstance, $log,
        data, Cropper
    ) {
        'ngInject';

        this.$scope = $scope;
        this.$uibModalInstance = $uibModalInstance;
        this.$log = $log;
        this.data = data;
    }

    crop() {
        
    }


}
