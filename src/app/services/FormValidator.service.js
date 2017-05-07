export class FormValidatorService {
    constructor() {
        'ngInject';

        this.regx = {
            email: /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
            notSpecialWord: /[^\{\}\[\]\/?.,;:|\)*~`!^\+<>@\#$%&\\\=\(\'\"]$/g,
            password: /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{0,255}$/g,
            ignoreRepeatWord: /^(?:(.)(?!\1\1))*$/g
        };

        this.avoidWord = ['sex', 'fuck', 'suck', 'shit', 'cunt', 'pussy'];
    }

    getRegx(name) {
        return this.regx[name];
    }

    passwordTest(str) {
        let err = null;
        let validate = false;

        if(this.regx.password.test(str)) {
            err = 'You have to use Lartin Char, number and special char at least';
        }
        else if(this.regx.ignoreRepeatWord.test(str)) {
            err = '같은 글자는 3번 이상 반복될 수 없습니다';
        }
        else {
            validate = true;
        }

        return { err, validate };
    }
}
