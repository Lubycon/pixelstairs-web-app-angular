export class ImageResolutionService {
    constructor() {

    }

    setResolution(img, resolution) {
        if(!img) return false;
        return !!img.isPixelOwn ? img.file + resolution : img.file;
    }
}
