
import './main/main.module';
import './account/account.module';

angular
    .module('app.pages', [
        'app.pages.main',
        'app.pages.account'
    ])
    ;
