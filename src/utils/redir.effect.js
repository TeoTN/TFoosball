import { call } from "redux-saga/effects";
import { browserHistory } from "react-router";

export const redir = url => call([browserHistory, browserHistory.push], url);
