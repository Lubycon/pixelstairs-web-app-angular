export class ImageService {
    constructor(
        $q,
        USER_DEFAULT_PROFILE_IMG, USER_AGENT
    ) {
        'ngInject';

        this.$q = $q;
        this.USER_DEFAULT_PROFILE_IMG = USER_DEFAULT_PROFILE_IMG;
        this.USER_AGENT = USER_AGENT;
    }

    setResolution(img, resolution = '1920') {
        if(!img) return false;

        console.log(this.USER_AGENT.isMobileScreen, resolution);

        if(this.USER_AGENT.isMobileScreen && resolution === '1920') {
            resolution = '640';
        }
        return !!img.isPixelOwn ? img.file + resolution : img.file;
    }

    getUserProfile(img, resolution = 320) {
        if(!img) return this.USER_DEFAULT_PROFILE_IMG;

        return this.setResolution(img, resolution);
    }

    convertToBase64(img) {
        let defer = this.$q.defer();
        const loader = this.__getCanvas__(img);

        loader.then(res => {
            defer.resolve(res.canvas.toDataURL());
        }, err => {
            defer.reject('Failed Converting to base64');
        });

        return defer.promise;
    }

    isTransparency(img) {
        let defer = this.$q.defer(),
            counter = 0;
        const loader = this.__getCanvas__(img);

        loader.then(res => {
            return res.context.getImageData(0, 0, res.img.width, res.img.height);
        }, err => {
            defer.reject('Get canvas failed exception: imageService');
        }).then(imgData => {
            /*
                data[0] = r
                data[1] = g
                data[2] = b
                data[3] = a
            */
            const pixelData = imgData.data;
            for(let i = 0; i < pixelData.length; i+=4) {
                if(pixelData[i+3] < 255) counter++;
                else continue;
            }

            defer.resolve(counter > 0 ? true : false);
        }, err => {
            defer.reject('Detect transparency pixel exception: imageService');
        });

        return defer.promise;
    }

    __getCanvas__(img) {
        const canvas = document.createElement('canvas');
        let defer = this.$q.defer(),
            ctx = canvas.getContext('2d'),
            blobUrl = URL.createObjectURL(img);

        let imgObj = new Image();

        imgObj.onload = function() {
            canvas.width = this.width;
            canvas.height = this.height;
            ctx.drawImage(this, 0, 0, this.width, this.height);
            defer.resolve({
                img: this,
                canvas: canvas,
                context: ctx
            });
        };
        imgObj.onError = function() {
            defer.reject('Failed loading to canvas');
        };

        imgObj.src = blobUrl;

        return defer.promise;
    }
}
