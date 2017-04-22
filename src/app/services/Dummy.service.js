export class DummyService {
    constructor() {
        'ngInject';
    }

    get() {
        return {
            contents: this.__ContentDummy__(),
            content: this.__ContentDetailDummy__()
        };
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
                    file: 'https://images.unsplash.com/profile-fb-1487395192-9eb133efa8b3.jpg?dpr=2&auto=compress,format&fit=crop&w=64&h=64&q=80&cs=tinysrgb&crop=faces&bg=fff',
                    index: null
                }
            },
            picture: {
                title: 'Test Title',
                image: {
                    id: null,
                    file: 'https://images.unsplash.com/photo-1491464414473-32ef3b981adb?dpr=2&auto=format&fit=crop&w=1500&h=844&q=80&cs=tinysrgb&crop=&bg=',
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

            if(i%2 === 0) resultList[i].picture.image.file = 'https://images.unsplash.com/photo-1492574653778-0d770e661ed0?dpr=2&auto=format&fit=crop&w=1500&h=844&q=80&cs=tinysrgb&crop=&bg=';
            else if(i%3 === 0) resultList[i].picture.image.file = 'https://images.unsplash.com/photo-1491464159997-71e58431cf97?dpr=2&auto=format&fit=crop&w=1500&h=1125&q=80&cs=tinysrgb&crop=&bg=';
            else if(i%5 === 0) resultList[i].picture.image.file = 'https://images.unsplash.com/photo-1490777351133-abbae7558cb6?dpr=2&auto=format&fit=crop&w=1500&h=1875&q=80&cs=tinysrgb&crop=&bg=';
            else if(i%7 === 0) resultList[i].picture.image.file = 'https://images.unsplash.com/photo-1491462359702-8fffeff41e93?dpr=2&auto=format&fit=crop&w=1500&h=2667&q=80&cs=tinysrgb&crop=&bg=';
            else if(i%11 === 0) resultList[i].picture.image.file = 'https://images.unsplash.com/photo-1490777088707-ddcbedb606bc?dpr=2&auto=format&fit=crop&w=1500&h=844&q=80&cs=tinysrgb&crop=&bg=';
        }

        return resultList;
    }

    __ContentDetailDummy__() {
        let dummy = {
            id: '0',
            title: 'Test Title',
            image: {
                id: '0',
                file: 'https://images.unsplash.com/photo-1492574653778-0d770e661ed0?dpr=2&auto=format&fit=crop&w=1500&h=844&q=80&cs=tinysrgb&crop=&bg=',
                index: null
            },
            like: this.__getRandomVal__(10000) * 1,
            tags: ['Tag1', 'Tag2', 'Tag3', 'Tag4', 'Tag5', 'Tag6'],
            member: {
                id: '0',
                name: 'Test User',
                profileImg: {
                    id: null,
                    file: 'https://images.unsplash.com/profile-fb-1487395192-9eb133efa8b3.jpg?dpr=2&auto=compress,format&fit=crop&w=64&h=64&q=80&cs=tinysrgb&crop=faces&bg=fff',
                    index: null
                }
            },
            description: 'Mattis sit penatibus habitasse? Ultrices ac elementum augue. Vel elit pulvinar. Adipiscing urna tristique montes, placerat penatibus sed, et ac etiam nunc! Dis arcu, aliquam et enim elit! Porta ultricies, ultrices etiam amet enim mus amet, in montes et lundium? Penatibus placerat, montes facilisis, dis, dapibus, dis purus? Augue et porttitor nec a.',
            createdAt: '2017-03-12T11:24:00'
        };
        dummy.view = dummy.like * (this.__getRandomVal__(7) * 1);

        return dummy;
    }

    /* @PRIVATE METHOD */
    __getRandomVal__(max) {
        return (Math.floor(Math.random() * max) + 1).toString();
    }
}
