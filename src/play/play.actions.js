// export const REQUEST_STATS = 'PLAY::STATS';
export const REQUEST_STATS_DONE = 'PLAY::STATS:DONE';

// export const requestStats = () => ({ type: REQUEST_STATS, });
export const requestStatsDone = (response) => ({ type: REQUEST_STATS_DONE, response});
