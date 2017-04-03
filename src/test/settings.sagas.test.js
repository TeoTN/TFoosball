import { call, put, take } from 'redux-saga/effects';
import api from '../api';
import { raiseError, showInfo } from '../shared/notifier.actions';
import { saveProfile, saveMember, validateMember, settings } from '../settings/settings.sagas';
import { getCurrentTeam } from '../teams/teams.sagas';

import {
    REQUEST_SAVE_PROFILE,
    REQUEST_SAVE_MEMBER,
    requestSaveProfile,
    requestSaveMember,
} from '../settings/settings.actions';


describe('SaveProfile saga', () => {
    const url = api.urls.profile();
    const errorMsg = 'Failed to save profile.';

    describe('Scenario 1: User profile saved', () => {
        const iterator = saveProfile();

        it('should wait to take REQUEST_SAVE_PROFILE', () => {
            const iter = iterator.next().value;
            expect(iter).toEqual(take(REQUEST_SAVE_PROFILE));
        });

        it('should call API with PATCH request to save profile', () => {
            const action = requestSaveProfile({ first_name: 'Abc', last_name: '123' });
            const iter = iterator.next(action).value;
            expect(iter).toEqual(call(api.requests.patch, url, action.partialData, errorMsg));
        });

        it('should put SHOW_INFO that profile was saved', () => {
            const iter = iterator.next().value;
            expect(iter).toEqual(put(showInfo('Profile changes saved.')));
        });

        it('should not return from saga', () => {
            expect(iterator.next().done).toBe(false);
        });
    });

    describe('Scenario 2: Failed to save user profile', () => {
        const iterator = saveProfile();

        it('should wait to take REQUEST_SAVE_PROFILE', () => {
            const iter = iterator.next().value;
            expect(iter).toEqual(take(REQUEST_SAVE_PROFILE));
        });

        it('should call API with PATCH request to save profile', () => {
            const action = requestSaveProfile({ first_name: 'Abc', last_name: '123' });
            const iter = iterator.next(action).value;
            expect(iter).toEqual(call(api.requests.patch, url, action.partialData, errorMsg));
        });

        it('should put RAISE_ERROR that profile was not saved', () => {
            const iter = iterator.throw(errorMsg).value;
            expect(iter).toEqual(put(raiseError(errorMsg)));
        });

        it('should not return from saga', () => {
            expect(iterator.next().done).toBe(false);
        });
    });

});


describe('SaveMember saga', () => {
    const currentTeam = {
        id: 1,
        member_id: 15,
    };
    const url = api.urls.teamMemberEntity(currentTeam.id, currentTeam.member_id);
    const successMsg = 'Team member profile saved.';
    const errorMsg = 'Failed to save team member.';

    describe('Scenario 1: Member profile saved', () => {
        const iterator = saveMember();
        const action = requestSaveMember({ username: 'Audiomatic' });

        it('should wait to take REQUEST_SAVE_MEMBER', () => {
            const iter = iterator.next().value;
            expect(iter).toEqual(take(REQUEST_SAVE_MEMBER));
        });

        it('should get current team', () => {
            expect(iterator.next(action).value).toEqual(call(getCurrentTeam));
        });

        it('should call API with PATCH request to save profile', () => {
            const iter = iterator.next(currentTeam).value;
            const data = validateMember(action.partialData);
            expect(iter).toEqual(call(api.requests.patch, url, data, errorMsg));
        });

        it('should put SHOW_INFO that profile was saved', () => {
            const iter = iterator.next().value;
            expect(iter).toEqual(put(showInfo(successMsg)));
        });

        it('should not return from saga', () => {
            expect(iterator.next().done).toBe(false);
        });
    });



    describe('Scenario 2: Failed to save member profile', () => {
        const iterator = saveMember();
        const action = requestSaveMember({ username: 'Audiomatic' });

        it('should wait to take REQUEST_SAVE_MEMBER', () => {
            const iter = iterator.next().value;
            expect(iter).toEqual(take(REQUEST_SAVE_MEMBER));
        });

        it('should get current team', () => {
            expect(iterator.next(action).value).toEqual(call(getCurrentTeam));
        });

        it('should call API with PATCH request to save profile', () => {
            const iter = iterator.next(currentTeam).value;
            const data = validateMember(action.partialData);
            expect(iter).toEqual(call(api.requests.patch, url, data, errorMsg));
        });

        it('should put RAISE_ERROR that the profile was NOT saved', () => {
            const iter = iterator.throw(errorMsg).value;
            expect(iter).toEqual(put(raiseError(errorMsg)));
        });

        it('should not return from saga', () => {
            expect(iterator.next().done).toBe(false);
        });
    });
});

describe('Validate member profile data', () => {
    it('should return data when username has length >=3', () => {
        const validData = {
            username: 'exe',
        };
        expect(() => validateMember(validData)).not.toThrowError();
        expect(validateMember(validData)).toEqual(validData);
    });

    it('should return data when username has length <= 14', () => {
        const validData = {
            username: 'executive12345',
        };
        expect(() => validateMember(validData)).not.toThrowError();
        expect(validateMember(validData)).toEqual(validData);
    });

    it('should throw error when username consists of more than 14 characters', () => {
        const invalidData = {
            username: 'anatomopatomorfolog',
        };
        expect(() => validateMember(invalidData)).toThrowError();
    });

    it('should throw error when username consists of no more than 3 characters', () => {
        const invalidData = {
            username: 'dx',
        };
        expect(() => validateMember(invalidData)).toThrowError();
    });
});

describe('Test settings route saga', () => {
    const iterator = settings();
    it('should yield all sagas that run on the route', () => {
        const exp = [
            saveProfile(),
            saveMember(),
        ];
        expect(JSON.stringify(iterator.next().value)).toEqual(JSON.stringify(exp));
    });
});
