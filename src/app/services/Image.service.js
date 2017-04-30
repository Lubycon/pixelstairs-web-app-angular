export class ImageService {
    constructor($q) {
        'ngInject';

        this.$q = $q;
    }

    setResolution(img, resolution) {
        if(!img) return false;
        return !!img.isPixelOwn ? img.file + resolution : img.file;
    }

    convertToBase64(img) {
        let defer = this.$q.defer();
        const canvasLoader = this.__getCanvas__(img);

        canvasLoader.then(res => {
            defer.resolve(res.toDataURL());
        }, err => {
            defer.reject('Failed Converting to base64');
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
            defer.resolve(canvas);
        };
        imgObj.onError = function() {
            defer.reject('Failed loading to canvas');
        };

        imgObj.src = blobUrl;

        return defer.promise;
    }
}
