import profile from '../mocks/profile';

export default (state = profile, action) => {
    switch (action.type) {
        case 'whatever':
            return {};
        default:
            return state;
    }
}