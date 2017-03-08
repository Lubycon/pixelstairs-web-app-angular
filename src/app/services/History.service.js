export class HistoryService {
    constructor(
        $rootScope
    ) {
        'ngInject';

        this.$rootScope = $rootScope;
    }


    push(history) {
        if(!this.$rootScope.stateHistory) this.$rootScope.stateHistory = [];
        this.$rootScope.stateHistory.push(history);
        if(this.$rootScope.stateHistory.length > 50) this.$rootScope.stateHistory.shift();
    }

    getAll() {
        return this.$rootScope.stateHistory;
    }

    get(index) {
        if(index) return this.$rootScope.stateHistory[index];
        else return this.$rootScope.stateHistory[this.$rootScope.stateHistory.length - 1];
    }

    getPrev(index) {
        if(index) return this.$rootScope.stateHistory[this.$rootScope.stateHistory.length - (index + 2)];
        else return this.$rootScope.stateHistory[this.$rootScope.stateHistory.length - 2];
    }
}
