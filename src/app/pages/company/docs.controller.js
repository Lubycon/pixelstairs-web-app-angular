export class DocsController {
    constructor(
        $log, $stateParams, $timeout
    ) {
        'ngInject';

        this.$log = $log;
        this.$stateParams = $stateParams;
        this.$timeout = $timeout;

        this.sections = angular.element('.doc-body');

        (this.init)();
    }

    init() {
        const SECTION = this.$stateParams.section;
        if(SECTION) this.__moveToSection__(SECTION);
    }

    /* PRIVATE METHOD */
    __moveToSection__(section) {
        const ELEMENT = angular.element(
            angular.element(this.sections[section * 1])
        );
        const SCROLL_POSITION = ELEMENT.offset().top - 70;

        this.$timeout(() => {
            angular.element(document).scrollTop(SCROLL_POSITION);
        },0);
    }
}
