export const isUsername = (value, allValues, props) => value.length > 14 || value.length < 2 ?
    new Error('Username length should be between 2 and 14 characters.') : undefined;

export const isName = (value, allValues, props) => value.length <= 30 ?
    undefined : new Error('Name should consist of no more than 30 characters.');

export const isScore = (value, allValues, props) => Number.isInteger(value) && value >= 0 ?
    undefined : new Error('Match score should be a number greater than zero.');