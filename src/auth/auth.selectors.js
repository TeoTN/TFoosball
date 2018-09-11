import { createSelector } from "reselect";
import { defaultAuthState } from "./auth.reducer";

export const selectAuthState = state => state.auth || defaultAuthState;
export const selectInvitationState = createSelector(selectAuthState, state => state.invitation);
export const selectActivationCode = createSelector(selectInvitationState, state => state.activationCode);
export const selectAuthProfile = createSelector(selectAuthState, state => state.profile || {});
export const selectIsTeamAdmin = createSelector(selectAuthProfile, profile => profile && profile.is_team_admin);
export const selectToken = createSelector(selectAuthState, state => state.token);
export const getPersistentAuthState = createSelector(
    selectAuthState,
    ({ token, refreshToken, expires_at, profile: { exp_history, ...profileData }, invitation }) => ({
        token,
        refreshToken,
        expires_at,
        profile: profileData,
        invitation,
    }),
);
