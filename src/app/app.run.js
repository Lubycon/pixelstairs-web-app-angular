

export function run ($rootScope, $log, AppSettingService) {
    'ngInject';



    AppSettingService.init();

    $log.debug('ROOT SCOPE => ', $rootScope);

    $log.debug('================================ RUN BLOCK END ================================');
}
