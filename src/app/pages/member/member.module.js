import { routerConfig } from './member.route';

import { MemberSettingController } from './member-setting.controller';

angular
    .module('app.pages.member', [

    ])
    .config(routerConfig)

    .controller('MemberSettingController', MemberSettingController)
    ;
