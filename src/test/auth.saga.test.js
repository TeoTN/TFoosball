import { call, put, take } from 'redux-saga/effects';
import storageAPIPolyfill from '../utils/storage.polyfill';
import { prepareWindow } from '../api/oauth';
import { fetchProfile, fetchLogout } from '../api/connectors';
import { setToken, signIn, signOut, setProfile, signedOut } from '../shared/auth.actions';
import { raiseError } from '../shared/error.actions';
import { openOAuthWindow, loginFlow, getOAuthErrorMsg } from '../shared/auth.sagas';
import profile from '../assets/mocks/profile.json';
import { browserHistory } from 'react-router'


describe('OAuth window success scenario', () => {
    const iterator = openOAuthWindow();
    const fixture = { token: 'some_token_value' };

    it('should yield an effect call([promptWindow, open])', () => {
        const promptWindow = prepareWindow();
        const iter1 = iterator.next().value;
        const call1 = call([promptWindow, promptWindow.open]);
        expect(JSON.stringify(iter1)).toEqual(JSON.stringify(call1));
    });

    it('should yield an effect put(setToken(token))', () => {
        expect(iterator.next(fixture).value).toEqual(put(setToken(fixture.token)));
    });
});

describe('OAuth window failure scenario', () => {
    const iterator = openOAuthWindow();
    const fixture = { error: 'failure' };

    it('should yield an effect call([promptWindow, open])', () => {
        const promptWindow = prepareWindow();
        const iter = iterator.next().value;
        const called = call([promptWindow, promptWindow.open]);
        expect(JSON.stringify(iter)).toEqual(JSON.stringify(called));
    });

    it('should yield an effect put(raiseError(errorMsg))', () => {
        const errorMsg = getOAuthErrorMsg(fixture);
        expect(iterator.throw(fixture).value).toEqual(put(raiseError(errorMsg)));
    });
});

describe('Login flow', () => {
    const iterator = loginFlow();
    const tokenFixture = { token: 'some_token_value' };

    beforeAll(() => {
        global.window.name = '';
        global.window = storageAPIPolyfill(window);
    });

    describe('success scenario', () => {
        it('should wait for log in', () => {
            expect(iterator.next(signIn()).value).toEqual(take(signIn().type));
        });

        it('should open OAuth window', () => {
            const iter = iterator.next().value;
            expect(iter).toEqual(call(openOAuthWindow));
        });

        it('should fetch user profile', () => {
            const iter = iterator.next(tokenFixture.token).value;
            expect(iter).toEqual(call(fetchProfile))
        });

        it('should set user profile', () => {
            const iter = iterator.next(profile).value;
            expect(iter).toEqual(put(setProfile(profile)));
        });

        it('should wait for sign out', () => {
            expect(iterator.next().value).toEqual(take(signOut().type));
        });

        it('should fetch log out', () => {
            expect(iterator.next().value).toEqual(call(fetchLogout));
        });

        it('should put signed out', () => {
            expect(iterator.next().value).toEqual(put(signedOut()))
        });

        it('should redirect to home page', () => {
            expect(iterator.next().value).toEqual(call(browserHistory.push, '/'));
        })
    });
});