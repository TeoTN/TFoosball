import { call, put, takeLatest, select } from 'redux-saga/effects';
import api from '../api/index';
import {  showInfo } from '../shared/notifier.actions';
import {
    saveSettings, onRequestSaveSettings, validateMember
} from './settings.sagas';
import { settingsSaved } from './settings.actions';
import { browserHistory } from 'react-router'

import {
    REQUEST_SAVE_SETTINGS,
    requestSaveSettings,
} from './settings.actions';
import { getSelectedTeam } from "../teams/teams.reducer";



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
    const settings = { first_name: 'ABC', last_name: '123', username: 'ABC123', hidden: true};
    const currentTeam = { id: 1, member_id: 15, };
    const successMsg = 'Your settings were saved';
    const errorMsg = 'Failed to save settings';


    describe('Scenario 1: Should save settings', () => {
        const action = requestSaveSettings({}, settings);
        const iterator = saveSettings(action);
        const memberUrl = api.urls.teamMemberEntity(currentTeam.id, currentTeam.member_id);

        it('should get current team', () => {
            expect(iterator.next().value).toEqual(select(getSelectedTeam));
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
