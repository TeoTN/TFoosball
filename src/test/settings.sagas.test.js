import { call, put, take, takeLatest } from 'redux-saga/effects';
import api from '../api';
import { raiseError, showInfo } from '../shared/notifier.actions';
import {
    saveSettings, onRequestSaveSettings, validateMember
} from '../settings/settings.sagas';
import { settingsSaved } from '../settings/settings.actions';
import { getCurrentTeam } from '../teams/teams.sagas';
import { browserHistory } from 'react-router'

import {
    REQUEST_SAVE_SETTINGS,
    requestSaveSettings,
} from '../settings/settings.actions';



describe('onRequestSaveSettings saga', () => {
    const iterator = onRequestSaveSettings();

    it('should take latest REQUEST_SAVE_SETTINGS', () => {
        expect(iterator.next().value).toEqual(takeLatest(REQUEST_SAVE_SETTINGS, saveSettings));
    });

    it('should return from the saga', () => {
        expect(iterator.next().done).toBe(true);
    });
});

describe('Save settings saga', () => {
    const memberSettings = { username: 'ABC123', };
    const profileSettings = { first_name: 'ABC', last_name: '123', };
    const currentTeam = { id: 1, member_id: 15, };
    const successMsg = 'Profile settings were saved';
    const errorMsg = 'Failed to save profile settings';

    describe('Scenario 1: Should save profile only', () => {
        const action = requestSaveSettings({}, profileSettings);
        const iterator = saveSettings(action);
        const profileUrl = api.urls.profile();

        it('should call API with PATCH request to save profile', () => {
            const iter = iterator.next(action).value;
            expect(iter).toEqual(call(api.requests.patch, profileUrl, action.values, errorMsg))
        });

        it('should show info about success', () => {
            expect(iterator.next().value).toEqual(put(showInfo(successMsg)));
        });

        it('should dispatch action SETTINGS_SAVED', () => {
            expect(iterator.next().value).toEqual(put(settingsSaved(action.values)));
        });
    });

    describe('Scenario 2: Should save member only', () => {
        const action = requestSaveSettings({}, memberSettings);
        const iterator = saveSettings(action);
        const memberUrl = api.urls.teamMemberEntity(currentTeam.id, currentTeam.member_id);

        it('should get current team', () => {
            expect(iterator.next().value).toEqual(call(getCurrentTeam));
        });

        it('should call API with PATCH request to save profile', () => {
            const iter = iterator.next(currentTeam).value;
            expect(iter).toEqual(call(api.requests.patch, memberUrl, action.values, errorMsg))
        });

        it('should show info about success', () => {
            expect(iterator.next().value).toEqual(put(showInfo(successMsg)));
        });

        it('should dispatch action SETTINGS_SAVED', () => {
            expect(iterator.next().value).toEqual(put(settingsSaved(action.values)));
        });

        it('should redir to new profile url', () => {
            const expected = call([browserHistory, browserHistory.push], '/profile/ABC123/settings');
            expect(iterator.next().value).toEqual(expected);
        });
    });

    describe('Scenario 3: Should both profile and member', () => {
        const action = requestSaveSettings({}, { ...memberSettings, ...profileSettings });
        const iterator = saveSettings(action);
        const profileUrl = api.urls.profile();
        const memberUrl = api.urls.teamMemberEntity(currentTeam.id, currentTeam.member_id);

        it('should call API with PATCH request to save profile', () => {
            const iter = iterator.next().value;
            expect(iter).toEqual(call(api.requests.patch, profileUrl, profileSettings, errorMsg));
        });

        it('should get current team', () => {
            expect(iterator.next().value).toEqual(call(getCurrentTeam));
        });

        it('should call API with PATCH request to save profile', () => {
            const iter = iterator.next(currentTeam).value;
            expect(iter).toEqual(call(api.requests.patch, memberUrl, memberSettings, errorMsg));
        });

        it('should show info about success', () => {
            expect(iterator.next().value).toEqual(put(showInfo(successMsg)));
        });

        it('should dispatch action SETTINGS_SAVED', () => {
            expect(iterator.next().value).toEqual(put(settingsSaved(action.values)));
        });

        it('should redir to new profile url', () => {
            const expected = call([browserHistory, browserHistory.push], '/profile/ABC123/settings');
            expect(iterator.next().value).toEqual(expected);
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
