export class MemberSettingController {
    constructor(
        $rootScope, $log, $uibModal,
        USER_DEFAULT_PROFILE_IMG,
        APIService, ImageService, FormRegxService, getMemberRsv
    ) {
        'ngInject';

        this.$rootScope = $rootScope;
        this.$log = $log;
        this.$uibModal = $uibModal;

        this.APIService = APIService;
        this.ImageService = ImageService;
        this.FormRegxService = FormRegxService;

        this.memberData = getMemberRsv.result;
        this.memberData.birthday = new Date(this.memberData.birthday);
        this.memberProfile = this.__getUserProfile__(this.memberData.profileImg);

        this.genders = [{
            name: 'Male',
            code: 'male'
        },{
            name: 'Female',
            code: 'female'
        },{
            name: 'etc',
            code: 'etc'
        }];

        this.selectBoxOption = {
            containerCssClass: 'custom-select2 full-width',
            dropdownCssClass: 'custom-select2',
            minimumResultsForSearch: -1
        };

        this.uploadedProfile = null;
    }

    changedFile(files, file, newFiles, invalidFiles) {
        if(files.length < 1) return false;
        /*@LOG*/ this.$log.debug(files, file, newFiles, invalidFiles);
        this.openCropModal();
    }

    openCropModal() {
        let modal = this.$uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            backdrop: true,
            templateUrl: 'app/components/modals/cropper/cropper.modal.tmpl.html',
            controller: 'CropperModalController',
            controllerAs: 'CropperCtrl',
            resolve: {
                data: () => {
                    return {
                        img: this.uploadedProfile
                    };
                }
            }
        });

        modal.result.then(res => {
            this.memberProfile = {
                file: res.cropped
            };
            this.memberData.profileImg = {
                file: res.cropped
            };
            /*@LOG*/ this.$log.debug('CROPPED IMAGE => ', this.memberData.profileImg);
        });
    }

    postData() {
        let data = angular.copy(this.memberData);
        /*@LOG*/ this.$log.debug(data);
        this.APIService.resource('members.detail', { id: data.id }).post(data)
        .then(res => {
            this.$log.debug(res);
        });
    }

    /* PRIVATE METHOD */
    __getUserProfile__(profileImg) {
        if(profileImg) {
            profileImg.file = this.ImageService.getUserProfile(profileImg);
        }
        else {
            profileImg = {
                file: this.ImageService.getUserProfile(profileImg)
            };
        }

        return profileImg;
    }
}
