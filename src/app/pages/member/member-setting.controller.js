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

        this.isBusy = false;
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
        console.log(this.memberProfile);
    }

    openCropModal() {
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
            /*@LOG*/ this.$log.debug('CROPPED IMAGE => ', this.memberData.profileImg);
        });
    }

    postData() {
        this.isBusy = true;
        let data = angular.copy(this.memberData);
        /*@LOG*/ this.$log.debug(data);

        if(!data.profileImg) data.profileImg = { file: null };

        this.APIService.resource('members.detail', { id: data.id }).put(data)
        .then(res => {
            alert('updated successfully!');
            this.isBusy = false;
        }, err => {
            alert(`GET ERROR::${err.status.code} ${err.msg}`);
            this.isBusy = false;
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
