import deepFreeze from 'deep-freeze';
import {
    setToken,
    setProfile,
    signedOut,
    signIn,
    signOut,
} from '../shared/auth/auth.actions';
import { profile, auth } from '../shared/auth/auth.reducer';
import {} from '../shared/auth/auth.types';
import {
    requestSaveMember,
    requestSaveProfile,
} from '../settings/settings.actions';

describe('Profile reducer', () => {
    it('should not change profile state on default', () => {
        const state = {};
        const action = { type: "NULL::DEFAULT", };

        deepFreeze(state);
        deepFreeze(action);

        expect(profile(state, action)).toEqual(state);
    });

    it('should update profile on REQUEST_SAVE_PROFILE', () => {
        const stateBefore = {
            first_name: 'abcdef',
        };
        const action = requestSaveProfile({ first_name: 'fib', last_name: 'nacci', });
        const stateAfter = {
            first_name: 'fib',
            last_name: 'nacci',
        };

        deepFreeze(stateBefore);
        deepFreeze(action);
        expect(profile(stateBefore, action)).toEqual(stateAfter);
    });

    it('should update profile on REQUEST_SAVE_MEMBER', () => {
        const stateBefore = {
            username: 'Pierre',
        };
        const action = requestSaveMember({ username: 'Cardin', });
        const stateAfter = {
            username: 'Cardin',
        };

        deepFreeze(stateBefore);
        deepFreeze(action);
        expect(profile(stateBefore, action)).toEqual(stateAfter);
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

    it('should update profile', () => {
        const stateBefore = {
            token: 'asdfghjkl',
            profile: {
                username: 'Username1',
                first_name: '1st name',
                last_name: 'last name',
            },
        };
        const action = requestSaveProfile({
            first_name: 'Jacob',
            last_name: 'Adler',
        });
        const stateAfter = {
            token: 'asdfghjkl',
            profile: {
                username: 'Username1',
                first_name: 'Jacob',
                last_name: 'Adler',
            }
        };

        deepFreeze(stateBefore);
        deepFreeze(action);

        expect(auth(stateBefore, action)).toEqual(stateAfter);
    });

    it('should update member profile', () => {
        const stateBefore = {
            token: 'asdfghjkl',
            profile: {
                username: 'Username1',
                first_name: '1st name',
                last_name: 'last name',
            },
        };
        const action = requestSaveProfile({
            username: 'JAdler',
        });
        const stateAfter = {
            token: 'asdfghjkl',
            profile: {
                username: 'JAdler',
                first_name: '1st name',
                last_name: 'last name',
            }
        };

        deepFreeze(stateBefore);
        deepFreeze(action);

        expect(auth(stateBefore, action)).toEqual(stateAfter);
    });
});
