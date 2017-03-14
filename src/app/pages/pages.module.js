
import './main/main.module';
import './account/account.module';
import './member/member.module';

angular
    .module('app.pages', [
        'app.pages.main',
        'app.pages.account',
        'app.pages.member'
    ])
    ;
