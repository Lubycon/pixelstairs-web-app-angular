export function LoadingIconDirective() {
    'ngInject';

    let directive = {
        restrict: 'EA',
        templateUrl: 'app/components/loading_icon/loading_icon.tmpl.html',
        scope: {
            icon: '@'
        },
        link: link,
        controller: LoadingIconController,
        controllerAs: 'LoadingIcon'
    };

    return directive;

    function link() {

    }
}

class LoadingIconController {
    constructor() {
        'ngInject';
    }
}
