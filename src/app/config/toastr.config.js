

export function toastrConfig(toastrConfig) {
    'ngInject';

    toastrConfig.allowHtml = true;
    toastrConfig.timeOut = 4000;
    toastrConfig.positionClass = 'toast-top-right';
    toastrConfig.preventDuplicates = false;
    toastrConfig.preventOpenDuplicates = true;
    toastrConfig.progressBar = false;
    toastrConfig.maxOpened = 10;
    toastrConfig.autoDismiss = false;
    toastrConfig.showEasing = 'swing';
}
