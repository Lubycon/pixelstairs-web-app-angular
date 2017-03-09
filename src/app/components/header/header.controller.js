export class HeaderController {
    constructor(
        $rootScope, $stateParams,
        AuthenticationService
    ) {
        'ngInject';

        this.$rootScope = $rootScope;
        this.$stateParams = $stateParams;
        this.AuthenticationService = AuthenticationService;
    }
}
