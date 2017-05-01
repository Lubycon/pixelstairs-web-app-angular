
import './main/main.module';
import './account/account.module';
import './company/company.module';
import './member/member.module';
import './contents/contents.module';
import './error/error.module';

angular
    .module('app.pages', [
        'app.pages.main',
        'app.pages.account',
        'app.pages.company',
        'app.pages.member',
        'app.pages.contents',
        'app.pages.error'
    ])
    ;
