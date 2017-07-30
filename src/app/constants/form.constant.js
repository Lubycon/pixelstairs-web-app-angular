/*
    @name: form.constant.js
    @desc: Pixelstairs에 들어가는 폼들 상수 값
    @authro: Evan Moon
    @created_at: 2017.07.20
*/

const GENDER_OPTIONS = [{
    name: 'Male',
    code: 'male'
},{
    name: 'Female',
    code: 'female'
},{
    name: 'etc',
    code: 'etc'
}];

const SIGN_DROP_REASONS = {
    good: [{
        id: 1,
        value: 'SIGN_DROP.REASONS.GOOD.0001'
    },{
        id: 2,
        value: 'SIGN_DROP.REASONS.GOOD.0002'
    },{
        id: 3,
        value: 'SIGN_DROP.REASONS.GOOD.0003'
    },{
        id: 4,
        value: 'SIGN_DROP.REASONS.GOOD.0004'
    },{
        id: 5,
        value: 'SIGN_DROP.REASONS.GOOD.0005'
    }],
    bad: [{
        id: 1,
        value: 'SIGN_DROP.REASONS.BAD.0001'
    },{
        id: 2,
        value: 'SIGN_DROP.REASONS.BAD.0002'
    },{
        id: 3,
        value: 'SIGN_DROP.REASONS.BAD.0003'
    },{
        id: 4,
        value: 'SIGN_DROP.REASONS.BAD.0004'
    },{
        id: 5,
        value: 'SIGN_DROP.REASONS.BAD.0005'
    }]
};


/* EXPORT */
export const FORM_CONSTANT = {
    GENDER_OPTIONS,
    SIGN_DROP_REASONS
};
