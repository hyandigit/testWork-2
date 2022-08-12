export let Rules = {
    required: (input) => {
        return input.value.length > 0;
    },
    min: (input, size) => {
        console.log(input, +size);
        return input.value.length >= +size;
    }
};