import {Rules} from './rules.js';

export let Validator = {
    rules: new Map, //[ 'input_name' : ['required', 'min:2'] ]
    inputs: new Map,
    form: null,

    validate: function() {
        let result = {};
        this.rules.forEach((rules, index) => {
           if (this.inputs.has(index)) {
                rules.forEach((rule) => {
                    let value = rule.split(':');
                    let params = [];

                    if (value.length > 1) {
                        params = value[1].split(',');
                    }
                    value = value[0];

                    if (typeof Rules[value] == 'function') {
                        console.log(...params);
                        if (!Rules[value](this.inputs.get(index), ...params)) {
                            if (!result[index]) {
                                result[index] = [];
                            }
                            result[index].push(value);
                        }
                    }
                });
           }
        });
        return result;
    },
    addRule(inputName, rule) {
        this.rules.set(inputName, rule);
    },
    addInput(input) {
        this.inputs.set(input.name, input);
    }
};