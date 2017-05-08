export class FormRegxService {
    constructor($log) {
        'ngInject';

        this.$log = $log;

        this.regx = {
            email: /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
            specialChars: /[^\{\}\[\]\/?.,;:|\)*~`!^\+<>@\#$%&\\\=\(\'\"]$/g,
            ignoreChars: /([\'\";\/\\&=\(\)\{\}\[\]<>])+/g,
            passwordSpecialChars: /([\!\@\#\$\%\^\*\+\-\_\.\,\`])+/g,
            passwordMinLength: /^.{8,}$/,
            lowercase: /([a-z])+/g,
            uppercase: /([A-Z])+/g,
            number: /([0-9])+/g,
            ignoreRepeatWord: /^(?:(.)(?!\1\1))*$/g
        };

        this.avoidWord = ['sex', 'fuck', 'suck', 'shit', 'cunt', 'pussy'];
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
                regx: this.regx.passwordSpecialChars
            },{
                score: 5,
                regx: this.regx.ignoreRepeatWord
            },{
                score: 10,
                regx: this.regx.passwordMinLength
            }
        ];
    }

    calcPasswordLevel(password, max) {
        let score = 0;

        if(password.length > 0) {
            /*LOG*/ this.$log.debug('================== REGX ================');
            this.getPasswordTestList().forEach(v => {
                /*LOG*/ this.$log.debug(password, v.regx, v.score, password.match(v.regx));
                if(password.match(v.regx) && password.match(v.regx)) score += v.score;
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
