import deepFreeze from 'deep-freeze';
import {
    setToken,
    setProfile,
    signedOut,
} from '../shared/auth/auth.actions';
import { profile, auth, getToken } from '../shared/auth/auth.reducer';

describe('Profile reducer', () => {
    it('should not change profile state on default', () => {
        const state = {};
        const action = { type: "NULL::DEFAULT", };

        deepFreeze(state);
        deepFreeze(action);

        expect(profile(state, action)).toEqual(state);
    });
});

describe('Auth reducer', () => {
    it('should not change profile state on default', () => {
        const state = {};
        const action = {type: "NULL::DEFAULT",};

        deepFreeze(state);
        deepFreeze(action);

        expect(auth(state, action)).toEqual(state);
    });

    it('should store token', () => {
        const token = 'qwertyuiop12345';
        const stateBefore = {
            dummy: [],
        };
        const action = setToken(token);
        const stateAfter = {
            dummy: [],
            token,
        };

        deepFreeze(token);
        deepFreeze(stateBefore);
        deepFreeze(action);

        expect(auth(stateBefore, action)).toEqual(stateAfter);
    });

    it('should update token', () => {
        const token = 'qwertyuiop12345';
        const stateBefore = {
            profile: {},
            token: 'asdfghjkl',
        };
        const action = setToken(token);
        const stateAfter = {
            profile: {},
            token,
        };

        deepFreeze(token);
        deepFreeze(stateBefore);
        deepFreeze(action);

        expect(auth(stateBefore, action)).toEqual(stateAfter);
    });

    it('should clean state on SIGNED_OUT', () => {
        const stateBefore = {
            token: 'asdfghjkl',
            profile: {},
        };
        const action = signedOut();
        const stateAfter = {};

        deepFreeze(stateBefore);
        deepFreeze(action);

        expect(auth(stateBefore, action)).toEqual(stateAfter);
    });

    it('should set profile', () => {
        const stateBefore = {
            token: 'asdfghjkl',
        };
        const action = setProfile({
            id: 5,
            username: 'Username1',
        });
        const stateAfter = {
            token: 'asdfghjkl',
            profile: {
                id: 5,
                username: 'Username1',
            }
        };

        deepFreeze(stateBefore);
        deepFreeze(action);

        expect(auth(stateBefore, action)).toEqual(stateAfter);
    });
});


describe('Token selector', () => {
    it('should return token when token is present', () => {
        const state = { auth: {token: 'abc123'}};
        expect(getToken(state)).toBe('abc123');
    });

    it('should return undefined when token is not present', () => {
        const state = { auth: {}};
        expect(getToken(state)).toBeUndefined();
    });

    it('should return undefined when auth is not present', () => {
        const state = {};
        expect(getToken(state)).toBeUndefined();
    });
});
