export class ContentsUploadSuccessController {
    constructor(
        $log, $stateParams
    ) {
        'ngInject';

        this.contentId = $stateParams.id;
    }
}
