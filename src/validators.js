export const isUsername = (value, allValues, props) => value.length > 32 || value.length < 3 ?
    new Error('Username length should be between 3 and 32 characters.') : undefined;

export const isName = (value, allValues, props) => value.length <= 30 ?
    undefined : new Error('Name should consist of no more than 30 characters.');

export const isScore = (value, allValues, props) => Number.isInteger(value) && value >= 0 ?
    undefined : new Error('Match score should be a number greater than zero.');

const emailRegex = /(^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$)/;
export const isEmail = (value, allValues, props) => {
    return emailRegex.test(value) ?
    undefined : new Error('Provide a valid email');
};
