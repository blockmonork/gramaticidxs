const gramaticidxsPlus = {
    _put: function (el) {
        document.querySelector('#theBody').appendChild(el);
    },
    _mk: function (el) {
        return document.createElement(el);
    },
    _ge: function (id) {
        return (typeof document.getElementById(id) === undefined) ?
            false :
            document.getElementById(id)
    },
    _grama: function (txt) {
        let words = txt.split(' ');
        let r = [];
        const rg = new RegExp(/\W/);
        let n;
        for (let i = 0; i < words.length; i++) {
            let word = words[i];
            let x = word.length - 1;
            if (x >= 1) {
                let lc = word[x];
                if (rg.test(lc)) {
                    x--;
                    lc = word[x]
                }
                n = word.substring(0, x) + lc.replace(/[aeo]/gi, 'x');

            } else {
                n = word.replace(/[aeo]/gi, 'x');
            }
            r.push(n);
        }
        return r.join(' ');
    },
    init: function () {
        let i = this._mk('input');
        i.id = 'inputTxt';
        i.setAttribute('type', 'text');
        i.setAttribute('maxLength', '1000');
        i.setAttribute('placeHolder', 'type our text to be killed by gramaticidxs');
        this._put(i);
        this._put(this._mk('br'));
        let bt = this._mk('button');
        bt.setAttribute('onClick', 'gramaticidxsPlus.grThis();');
        bt.textContent = 'kill this!';
        this._put(bt);
        this._ge('inputTxt').focus();
    },
    grThis: function () {
        let inputTxt = this._ge('inputTxt').value || false;
        if (inputTxt && inputTxt.length > 0) {
            let newTxt = this._grama(inputTxt);
            let ta = this._ge('ta') || false;
            if (!ta) {
                let ta = this._mk('textarea');
                ta.id = 'ta';
                ta.value = newTxt;
                this._put(ta);
            } else {
                ta.value = newTxt;
            }
        } else {
            alert('no input');
            this._ge('inputTxt').focus();

        }
    },
};
(function () {
    gramaticidxsPlus.init();
})();