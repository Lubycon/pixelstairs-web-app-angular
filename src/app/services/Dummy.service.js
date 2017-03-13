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
                    file: 'https://source.unsplash.com/random',
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
        }

        return resultList;
    }

    /* @PRIVATE METHOD */
    __getRandomVal__(max) {
        return (Math.floor(Math.random() * max) + 1).toString();
    }
}