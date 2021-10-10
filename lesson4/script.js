'use strict';

// first and second questions
// https://regex101.com/r/FT1kH0/1
const replaceRe = new RegExp(/((')(?=\W))|((?<=\W|^)('))/, 'g');
const $txt = document.querySelector('.text-for-replace');
const $replaceBtn = document.querySelector('.replace-button');

$replaceBtn.addEventListener( 'click', event => {
    let text = $txt.value;
    text = text.replace(replaceRe, '"');
    $txt.value = text;
})

// third question
const checkNameRe = new RegExp(/^[a-zа-яё]+$/, 'gi');
const checkPhoneRe = new RegExp(/^\+7\([0-9]{3}\)[0-9]{3}-?[0-9]{4}$/, 'g');                // https://regex101.com/r/8ao3ez/1
const checkMailRe1 = new RegExp(/^[a-z]+[-a-z._]+[a-z]+@[a-z]+[-a-z.]+\.[a-z]{2,4}$/, 'gi');  // https://regex101.com/r/Lbs2iA/1
const checkMailRe2 = new RegExp(/[-._][-._]/, 'g');

let $form = document.querySelector('form');

$form.addEventListener('submit', event => {
    let data = new FormData($form);
    for(let [key, value] of data.entries()){
        let result = true;
        console.log(key, '=', value);
        if (key == 'name') {
            result = value.match(checkNameRe);
        };
        if (key == 'phone') {
            result = value.match(checkPhoneRe);
        }
        if (key == 'mail') {
            result = value.match(checkMailRe1) && !value.match(checkMailRe2);
        }
        if (!result) {
            event.preventDefault();
            document.querySelector(`#${key}`).classList.add('err');
            document.querySelector(`.${key}`).classList.remove('hidden');
        } else {
            document.querySelector(`#${key}`).classList.remove('err');
            document.querySelector(`.${key}`).classList.add('hidden');
        }
    }
})
