/*
    @name: FormRegx.service.js
    @desc: 앱 폼 밸리데이션 체크 서비스
    @author: Evan Moon
    @created_at: 2017.05.08
*/

export class FormRegxService {
    constructor($log) {
        'ngInject';

        this.$log = $log;

        this.regx = {
            email: /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
            basic: /[^]+$/,
            nickname: /[^\!\@\#\$\%\^\&\*\.\,\`\"\'\s]+$/,
            password: {
                specialChars: /[\?\!\@\#\$\%\^\*\+\-\_\.\,\`]/,
                minlength: /^.{8,}$/,
                repeat: /^(?:(.)(?!\1\1))*$/
            },
            lowercase: /[a-z]/,
            uppercase: /[A-Z]/,
            number: /[0-9]/
        };
    }

    getRegx(name) {
        return this.regx[name];
    }

    getPasswordTestList() {
        return [{
                score: 1,
                regx: this.regx.lowercase
            },{
                score: 1,
                regx: this.regx.uppercase
            },{
                score: 1,
                regx: this.regx.number
            },{
                score: 2,
                regx: this.regx.password.specialChars
            },{
                score: 5,
                regx: this.regx.password.repeat
            },{
                score: 10,
                regx: this.regx.password.minlength
            }
        ];
    }

    getPasswordLevel(score) {
        if(score >= 100) {
            return 'perfect';
        }
        else if(score > 80) {
            return 'high';
        }
        else if(score > 30) {
            return 'mid';
        }
        else {
            return 'low';
        }
    }

    calcPasswordScore(password, max) {
        let score = 0;

        if(password && password.length > 0) {
            /*LOG*/ this.$log.debug('================== REGX ================');
            this.getPasswordTestList().forEach(v => {
                /*LOG*/ this.$log.debug(password, v.regx, v.score, v.regx.test(password));
                if(v.regx.test(password)) score += v.score;
                else score -= v.score;
            });
            /*LOG*/ this.$log.debug('========================================');
            /*LOG*/this.$log.debug('FINAL SCORE =>', score);
        }
        else score = 0;

        score = score > 0 ? (score / max) * 100 : 0;

        return score;
    }
}
