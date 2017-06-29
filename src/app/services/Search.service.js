/*
    @name: SearchService
    @desc: Pixelstairs filter protocol
    @author: Evan Moon
    @created_at: 2017-06-28
*/

/*
    쿼리 종류: filter, sort
    범위 검색: query=key:range1~range2
    키 밸류 단일 검색: query=key:value
    키 비교 검색: query=key1>key2||key2<=key3
    단일 검색: search=key:value

    null -> isNull
    오름차순 -> asc
    내림차순 -> desc
    중첩 쿼리 구분자 -> ||
*/

export class SearchService {
    constructor(
        $location, $window
    ) {
        'ngInject';

        this.$location = $location;
        this.$window = $window;
    }

    getSearchData() {
        
    }
}
