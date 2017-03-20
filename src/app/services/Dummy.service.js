export class DummyService {
    constructor() {
        'ngInject';
    }

    get(name) {
        switch(name) {
            case 'contents': return this.__ContentDummy__();
            default: return null;
        }
    }

    /* @PRIVATE METHOD */
    __ContentDummy__() {
        let dummy = {
            id: null,
            member: {
                id: null,
                name: 'Test User',
                profileImg: {
                    id: null,
                    file: 'https://source.unsplash.com/random',
                    index: null
                }
            },
            picture: {
                title: 'Test Title',
                image: {
                    id: null,
                    file: 'http://mblogthumb2.phinf.naver.net/20160719_229/a878062_1468907010796uPdNo_JPEG/10_02.jpg?type=w800',
                    index: null
                },
                view: null,
                like: null
            }
        };

        let resultList = [];

        for(let i = 0; i < 100; i++) {
            resultList[i] = angular.copy(dummy);
            resultList[i].id = i;
            resultList[i].member.id = this.__getRandomVal__(10);
            resultList[i].member.profileImg.id = this.__getRandomVal__(99999);

            resultList[i].picture.title += i;
            resultList[i].picture.id = this.__getRandomVal__(99999);
            resultList[i].picture.image.id = this.__getRandomVal__(99999);
            resultList[i].picture.like = this.__getRandomVal__(10000) * 1;
            resultList[i].picture.view = resultList[i].picture.like * (this.__getRandomVal__(7) * 1);

            if(i%2 === 0) resultList[i].picture.image.file = 'http://file.instiz.net/data/cached_img/upload/8/4/b/84bc71536057b02340e247aae8b75336.jpg';
            else if(i%3 === 0) resultList[i].picture.image.file = 'http://file.instiz.net/data/cached_img/upload/3/9/e/39e7ba2973294122550d4ef105f3ceeb.gif';
            else if(i%5 === 0) resultList[i].picture.image.file = 'http://scontent.cdninstagram.com/t51.2885-15/s480x480/e15/10895414_380670642057741_645582069_n.jpg?ig_cache_key=OTA3NTc3NzM0MTAzMjcxOTQ0.2';
        }

        return resultList;
    }

    /* @PRIVATE METHOD */
    __getRandomVal__(max) {
        return (Math.floor(Math.random() * max) + 1).toString();
    }
}
