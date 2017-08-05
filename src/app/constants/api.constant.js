/*
    @name: api.constant.js
    @desc: Pixelstairs API 목록
    @author: Evan Moon
    @created_at: 2017.07.16
*/

export const API_LIST = {
    members: () => {
        const prefix = 'members';
        return {
            signin: `${prefix}/signin`,
            signout: `${prefix}/signout`,
            signup: `${prefix}/signup`,
            signdrop: `${prefix}/signdrop`,
            signdropSurvey: `${prefix}/signdrop/survey/list`,

            simple: `${prefix}/simple`,
            detail: `${prefix}/{id}/detail`,
            exists: {
                email: `${prefix}/exists/email`,
                nickname: `${prefix}/exists/nickname`
            },
            pwd: {
                mail: `${prefix}/password/mail`,
                reset: `${prefix}/password/reset`,
                token: `${prefix}/password/token`
            }
        };
    },
    contents: () => {
        const prefix = 'contents';
        return {
            upload: `${prefix}`,
            list: `${prefix}`,
            detail: `${prefix}/{id}`,
            image: `${prefix}/{id}/image`,
            like: `${prefix}/{id}/like`
        };
    },
    certs: () => {
        const prefix = 'certs';
        return {
            signup: {
                mail: `${prefix}/signup/mail`,
                time: `${prefix}/signup/time`,
                code: `${prefix}/signup/code`
            },
            password: {
                check: `${prefix}/password`,
                code: `${prefix}/password/code`
            }
        };
    },
    tracker: () => {
        const prefix = 'tracker';
        return {
            tracker: ''
        };
    },
    quotes: () => {
        const prefix = 'quotes';
        return {
            success: `${prefix}/success`,
            mistake: `${prefix}/mistake`
        };
    }
};
