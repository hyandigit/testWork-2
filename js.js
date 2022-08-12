import {Validator} from "./js/validation/validate.js";

let btn = document.querySelector('#button');
btn.addEventListener('click', function() {
    document.querySelector('.overlay').style.display = 'block';
    document.querySelector('.popup').style.display = 'block';
});

let form = document.querySelector('#form');

if (!form) {
    console.error('Form not found');
}

let validator = Object.create(Validator);
validator.addRule('user_name', ['required', 'min:2']);
validator.addRule('email', ['required', 'min:2']);
validator.addRule('phone', ['required', 'min:2']);
for(let i = 0; i < 4; i++) {
    validator.addInput(form.elements[i]);
}
form.addEventListener('submit', function(event) {
    let list = form.querySelectorAll('.input-error');
    for (let i of list) {
        i.innerHTML = '';
    }
    let validate = validator.validate();
    if (Object.keys(validate).length) {
        event.preventDefault();
        for(let i in validate) {
            let input = form.querySelector(`input[name="${i}"]`);
            let div = input.nextElementSibling;
            if (!div) {
                div = document.createElement('div');
                input.parentNode.append(div);
                div.classList.add('input-error');
            }
            for(let j in validate[i]) {
                switch (validate[i][j]) {
                    case 'required':
                        div.innerHTML += 'Value must be <br>';
                        break;
                    case 'min':
                        div.innerHTML += 'Value must be more than 2 symbols <br>';
                        break;
                    default:

                }
            }
        }
    } else {
        document.querySelector('.overlay').style.display = 'none';
        document.querySelector('.popup').style.display = 'none';
        alert('Form submitted successfully');
    }
    return false;
});