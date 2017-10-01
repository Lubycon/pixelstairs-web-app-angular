export class MemberSettingController {

    constructor(
        $rootScope, $log, $uibModal, toastr,
        USER_DEFAULT_PROFILE_IMG,
        AppSettingService,
        APIService, ImageService, FormRegxService, getMemberRsv
    ) {
        'ngInject';

        this.$rootScope = $rootScope;
        this.$log = $log;
        this.$uibModal = $uibModal;
        this.toastr = toastr;

        this.AppSettingService = AppSettingService;
        this.APIService = APIService;
        this.ImageService = ImageService;
        this.FormRegxService = FormRegxService;

        this.memberData = getMemberRsv.result;
        this.originMemberData = angular.extend({}, this.memberData);

        this.memberProfile = this.__getUserProfile__(this.memberData.profileImg);

        this.initMemberData = angular.extend({}, this.memberData);

        this.selectBoxOption = {
            containerCssClass: 'custom-select2 full-width',
            dropdownCssClass: 'custom-select2',
            minimumResultsForSearch: -1
        };

        this.uploadedProfile = null;

        this.isBusy = false;
        this.isProfileBusy = false;
    }

    changedFile(files, file, newFiles, invalidFiles) {
        if(files.length < 1) return false;
        /*@LOG*/ this.$log.debug(files, file, newFiles, invalidFiles);
        this.openCropModal();
    }

    setProfileImg(croppedImg) {
        this.memberProfile = {
            file: croppedImg
        };
        this.memberData.profileImg = {
            file: croppedImg
        };
    }

    removeProfileImg() {
        this.memberData.profileImg = { file: null, delete: true };
        this.memberProfile = this.__getUserProfile__();
    }

    openCropModal() {
        this.isProfileBusy = true;
        let modal = this.$uibModal.open({
            windowClass: 'cropper-modal-window',
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            backdrop: 'static',
            templateUrl: 'app/components/modals/cropper/cropper.modal.tmpl.html',
            controller: 'CropperModalController',
            controllerAs: 'CropperCtrl',
            keyborad: true,
            resolve: {
                data: () => {
                    return {
                        img: this.uploadedProfile
                    };
                }
            }
        });

        modal.result.then(res => {
            this.setProfileImg(res.cropped);
            this.isProfileBusy = false;
            /*@LOG*/ this.$log.debug('CROPPED IMAGE => ', this.memberData.profileImg);
        }, err => {
            this.isProfileBusy = false;
        });
    }

    isExistName() {
        if(this.originMemberData.nickname === this.memberData.nickname) {
            this.form.nickname.$setValidity('exist', true);
            return false;
        }

        let data = {
            nickname : this.memberData.nickname
        };

        this.APIService.resource('users.exists.nickname').post(data)
        .then(res => {
            this.form.nickname.$setValidity('exist', !res.result);
        }, err => {
            this.form.nickname.$setValidity('exist', true);
        });
    }

    postData() {
        this.isBusy = true;
        let data = angular.copy(this.memberData);
        /*@LOG*/ this.$log.debug(data);

        if(!data.profileImg) data.profileImg = { file: null };

        this.APIService.resource('users.me').put(data)
        .then(res => {
            this.toastr.success('Upload successfully');
            this.isBusy = false;

            this.AppSettingService.updateMemberData(res.result);
            this.$rootScope.$broadcast('update-member-data');
        }, err => {
            this.isBusy = false;
            let msg = this.$translate.instant('ALERT_ERROR.ACCOUNT_SETTING.FAILED');
            alert(msg);
        });
    }

    /* PRIVATE METHOD */
    __getUserProfile__(profileImg) {
        let tmp;

        if(profileImg) {
            tmp = angular.extend({}, profileImg);
            tmp.file = this.ImageService.getUserProfile(profileImg);
        }
        else {
            tmp = {
                file: this.ImageService.getUserProfile(profileImg)
            };
        }

        return tmp;
    }
}
